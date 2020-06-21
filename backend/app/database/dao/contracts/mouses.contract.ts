import BaseContract from './base.contract';

const collection: string = 'mouses';
const validatorSchema: {} = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['category', 'name', 'price', 'stock', 'company', 'description', 'buttons'],
      properties: {
        category: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        name: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        price: {
          bsonType: 'number',
          description: 'must be a number and is required'
        },
        stock: {
          bsonType: 'int',
          description: 'must be a int and is required'
        },
        company: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        description: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        buttons: {
          bsonType: 'int',
          description: 'must be a int and is required'
        }
      }
    }
  }
};
const keys: string[] = ['category', 'name', 'price', 'stock', 'company', 'description', 'buttons'];

export default class MousesContract extends BaseContract {
  constructor() {
    super(collection, validatorSchema, keys);
  }
}
