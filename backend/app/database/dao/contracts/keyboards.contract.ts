import BaseContract from './base.contract';

const collection: string = 'keyboards';
const validatorSchema: {} = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['category', 'name', 'price', 'stock', 'company', 'description', 'type'],
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
        type: {
          bsonType: 'string',
          description: 'must be a string and is required'
        }
      }
    }
  }
};
const keys: string[] = ['category', 'name', 'price', 'stock', 'company', 'description', 'type'];

export default class KeyboardsContract extends BaseContract {
  constructor() {
    super(collection, validatorSchema, keys);
  }
}
