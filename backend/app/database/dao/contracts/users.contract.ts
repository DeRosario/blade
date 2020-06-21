import BaseContract from './base.contract';

const collection: string = 'users';
const validatorSchema: {} = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['firstName', 'lastName', 'email', 'password'],
      properties: {
        firstName: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        lastName: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        email: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        password: {
          bsonType: 'string',
          description: 'must be a string and is required'
        }
      }
    }
  }
};
const keys: string[] = ['firstName', 'lastName', 'email', 'password'];

export default class UsersContract extends BaseContract {
  constructor() {
    super(collection, validatorSchema, keys);
  }
}
