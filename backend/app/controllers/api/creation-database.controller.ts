import Controller from '../controller';
import express from 'express';
import DAOFactory from '../../database/dao/DAOFactory';
import CreationDatabaseService from '../../services/creation-database.service';

export default class CreationDatabaseController extends Controller {
  constructor() {
    super('/database');
    this.router.get(`${this.path}/setup`, this.setupDb);
  }

  async setupDb(request: express.Request, response: express.Response) {
    const check = await CreationDatabaseService.checkDatabase();
    if (check.ok) {
      Promise.all([
        (async () => {
          return await DAOFactory.getKeyboardsDAO().insertAll();
        })(),
        (async () => {
          return await DAOFactory.getMousesDAO().insertAll();
        })(),
        (async () => {
          return await DAOFactory.getScreensDAO().insertAll();
        })()
      ]).then((datas) => {
        if (datas[0] && datas[1] && datas[2]) {
          response.status(201).json({
            message: 'Successful setup database'
          });
        } else {
          response.status(500).json({
            message: 'Fail to insert all data in database'
          });
        }
      }, (error) => {
        console.log(error);
        return response.status(500).json({
          message: 'An error occured, fail to insert data in database.'
        });
      });
    } else {
      response.status(check.status).json({
        message: check.message
      });
    }
  }
}
