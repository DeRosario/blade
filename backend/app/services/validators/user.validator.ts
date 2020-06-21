import express from 'express';
import UserModel from '../../models/user.model';
import validator from 'validator';
import HasherService from '../hasher.service';
import owasp from 'owasp-password-strength-test';

export default abstract class UserValidator {

  static owaspConfigurationPassword() {
    owasp.config({
      allowPassphrases: true,
      maxLength: 128,
      minLength: 10,
      minPhraseLength: 20,
      minOptionalTestsToPass: 4
    });
  }

  static checkEmail(email: string) {
    if (validator.isEmail(email)) {
      return true;
    }
    return false;
  }

  static createUserValidation(request: express.Request): UserModel {
    const errors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      globalError: ''
    };
    let isError = false;
    if (request.body.firstName === undefined || !validator.isAlpha(request.body.firstName)) {
      errors.firstName = 'A firstName is required and can only contain letters.';
      isError = true;
    }

    if (request.body.lastName === undefined || !validator.isAlpha(request.body.lastName)) {
      errors.lastName = 'A lastName is required and can only contain letters.';
      isError = true;
    }

    if (request.body.email === undefined || !validator.isEmail(request.body.email)) {
      errors.email = 'An email is required.';
      isError = true;
    }

    if ((request.body.password === undefined || request.body.password.length < 6)) {
      errors.password = 'A password is required.';
      isError = true;
    }

    if (!owasp.test(request.body.password)) {
      errors.password = 'The password must be at least 10 characters long, at least one uppercase letter, at least one number, at least one special character.';
      isError = true;
    }

    if (!isError) {
      return new UserModel(
        request.body.lastName,
        request.body.firstName,
        request.body.email,
        HasherService.hashPassword(request.body.password)
      );
    } else {
      throw errors;
    }
  }

  static checkObjectid(id: any) {
    return validator.isMongoId(id.toString());
  }

}
