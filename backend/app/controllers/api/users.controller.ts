import Controller from '../controller';
import express from 'express';
import DAOFactory from '../../database/dao/DAOFactory';
import UserValidator from '../../services/validators/user.validator';
import UserModel from '../../models/user.model';
import HasherService from '../../services/hasher.service';

export default class UsersController extends Controller {
  constructor() {
    super('/api/users');
    this.router.post(`/connection/login`, this.login);
    this.router.post(`/connection/create`, this.addUser);
    this.router.get(`/connection/check-auth`, this.isLogged);
    this.router.get(`${this.path}/logout`, this.logout);

    UserValidator.owaspConfigurationPassword();
  }

  login(request: express.Request, response: express.Response) {
    const email = request.body.email;
    const password = request.body.password;

    if (email === undefined || password === undefined) {
      return response.status(500).json({
        message: 'You must enter an email and a password.'
      });
    }

    if (!UserValidator.checkEmail(email)) {
      return response.status(500).json({
        message: 'You must enter a valid email.'
      });
    }

    DAOFactory.getUsersDAO().getUserByEmail(email).then((user: UserModel) => {
      if (!user.getActivated()) {
        return response.status(401).json({
          message: 'account deactivated'
        });
      } else if (HasherService.compareTwoHash(password, user.getPassword())) {
        request.session!.regenerate((err) => {
          if (err) {
            return response.status(500).json({
              message: 'An error occured, in the regeneration of the session cookie.'
            });
          } else {
            request.session!.user = user;
            request.session!.connected = true;
            return response.status(200).json({
              logged: request.session!.connected
            });
          }
        });
      } else {
        request.session!.connected = false;
        return response.status(401).json({
          logged: request.session!.connected,
          message: 'Your email or password is incorrect'
        });
      }
    }).catch((reason) => {
      console.log(reason);
      return response.status(401).json({
        logged: request.session!.connected,
        message: 'Your email or password is incorrect'
      });
    }).catch((err) => {
      return response.status(500).send(err);
    });
  }

  async addUser(request: express.Request, response: express.Response) {
    try {
      const user: UserModel = UserValidator.createUserValidation(request);
      if (await DAOFactory.getUsersDAO().getUserByEmail(user.getEmail())) {
        return response.status(400).json({
          message: 'Email already exist.'
        });
      }
      if (UserValidator.checkObjectid(await DAOFactory.getUsersDAO().add(user))) {
        return response.status(201).json({
          message: 'user created'
        });
      }
      throw new Error('INTERNAL_ERROR');
    } catch (e) {
      if (e.message === 'INTERNAL_ERROR') {
        e.globalError = 'An error has occurred.';
      }
      return response.status(500).json(e);
    }
  }

  isLogged(request: express.Request, response: express.Response) {
    if (request.session === undefined) {
      return response.send(false);
    } else {
      if (request.session.connected === undefined || !request.session.connected || request.session.user === undefined) {
        return response.send(false);
      }
      return response.send(true);
    }
  }

  logout(request: express.Request, response: express.Response) {
    if (request.session !== undefined) {
      request.session.destroy((err) => {
        if (err) {
          return response.status(500).json({
            message: 'error'
          });
        } else {
          return response.status(200).json({
            message: 'You have been disconnected.'
          });
        }
      });
    } else {
      return response.status(200).json({
        message: 'You are already disconnected.'
      });
    }
  }
}
