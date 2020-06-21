import BaseContract from './base.contract';

const collection: string = 'users';
const validatorSchema: {} = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['firstName', 'lastName', 'email', 'password', 'admin', 'activated'],
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
        },
        admin: {
          bsonType: 'bool',
          description: 'must be a boolean and is required'
        },
        activated: {
          bsonType: 'bool',
          description: 'must be an boolean and is required'
        }
      }
    }
  }
};
const keys: string[] = ['firstName', 'lastName', 'email', 'password', 'admin', 'activated'];

export default class UsersContract extends BaseContract {
  constructor() {
    super(collection, validatorSchema, keys);
  }
}
