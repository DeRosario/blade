import BaseDAOImpl from './base.DAO.Impl';
import {
  Db, ObjectID
} from 'mongodb';
import ConnectionMongoDBManager from './connection';
import MouseModel from '../../../models/mouse.model';
import MousesDAO from '../dao/mouses.DAO';
import MousesContract from '../contracts/mouses.contract';

export default class MousesDAOImpl extends BaseDAOImpl < MouseModel > implements MousesDAO {

  constructor() {
    super(new MousesContract());
  }
  
  async changeStock(id: string, stock: number) {
    const dbConnection: Db = await ConnectionMongoDBManager.getDb();
    const datas = await dbConnection.collection(this.getContract().getCollection()).updateOne({
      _id: new ObjectID(id)
    }, {
      $set: {
        stock
      }
    });

    let result: boolean;
    if (datas.modifiedCount === 1.0) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }

  async insertAll(): Promise < boolean > {
    const dbConnection: Db = await ConnectionMongoDBManager.getDb();
    const datas = await dbConnection.collection(this.getContract().getCollection()).insertMany(
      [{
          category: 'mouses',
          name: 'Corsair Harpoon',
          price: 29.99,
          stock: 0,
          company: 'Corsair',
          description: 'Decription Corsair Harpoon',
          buttons: 2
        },
        {
          category: 'mouses',
          name: 'Corsair Ironclaw',
          price: 57.95,
          stock: 1,
          company: 'Corsair',
          description: 'Description Corsair Ironclaw',
          buttons: 2
        },
        {
          category: 'mouses',
          name: 'Corsair Scimitar Pro',
          price: 67.49,
          stock: 2,
          company: 'Corsair',
          description: 'Description Corsair Scimitar Pro',
          buttons: 3
        },
        {
          category: 'mouses',
          name: 'Razer Naga Trinity',
          price: 86.00,
          stock: 3,
          company: 'Razer',
          description: 'Description Razer Naga Trinity',
          buttons: 3
        },
        {
          category: 'mouses',
          name: 'Razer DeathAdder V2',
          price: 72.17,
          stock: 4,
          company: 'Razer',
          description: 'Description Razer DeathAdder V2',
          buttons: 4
        },
        {
          category: 'mouses',
          name: 'Razer Basilisk',
          price: 52.00,
          stock: 5,
          company: 'Razer',
          description: 'Description Basilisk',
          buttons: 4
        },
        {
          category: 'mouses',
          name: 'Razer Mamba Elite',
          price: 74.99,
          stock: 6,
          company: 'Razer',
          description: 'Description Razer Mamba Elite',
          buttons: 5
        },
        {
          category: 'mouses',
          name: 'Logitech G502 HERO',
          price: 67.81,
          stock: 7,
          company: 'Logitech',
          description: 'Description Logitech G502 HERO',
          buttons: 5
        },
        {
          category: 'mouses',
          name: 'Logitech G402 Hyperion',
          price: 37.01,
          stock: 8,
          company: 'Logitech',
          description: 'Description Logitech G402 Hyperion',
          buttons: 5
        },
        {
          category: 'mouses',
          name: 'Logitech MX Master',
          price: 89.90,
          stock: 9,
          company: 'Logitech',
          description: 'Description Logitech MX Master',
          buttons: 6
        }
      ]);
    if (datas.result.ok === 1) {
      return true;
    } else {
      return false;
    }
  }

  parseIn(item: MouseModel): object {
    return {

    };
  }

  parseOut(datas: any): MouseModel {
    return new MouseModel(
      datas.category,
      datas.name,
      datas.price,
      datas.stock,
      datas.company,
      datas.description,
      datas.buttons,
      datas._id
    );
  }
}
