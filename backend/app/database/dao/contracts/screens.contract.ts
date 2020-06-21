import BaseContract from './base.contract';

const collection: string = 'screens';
const validatorSchema: {} = {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['category', 'name', 'price', 'stock', 'company', 'description', 'inches', 'hz', 'connectors'],
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
        inches: {
          bsonType: 'int',
          description: 'must be a int and is required'
        },
        hz: {
          bsonType: 'int',
          description: 'must be a int and is required'
        },
        connectors: {
          bsonType: 'object',
          required: ['vga', 'hdmi', 'displayPort'],
          properties: {
            vga: {
              bsonType: 'int',
              description: 'must be a int and is required'
            },
            hdmi: {
              bsonType: 'int',
              description: 'must be a int and is required'
            },
            displayPort: {
              bsonType: 'int',
              description: 'must be a int and is required'
            }
          }
        }
      }
    }
  }
};
const keys: string[] = ['category', 'name', 'price', 'stock', 'company', 'description', 'inches', 'hz', 'connectors'];

export default class ScreensContract extends BaseContract {
  constructor() {
    super(collection, validatorSchema, keys);
  }
}
