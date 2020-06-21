import BaseDAOImpl from './base.DAO.Impl';
import {
  Db, ObjectID
} from 'mongodb';
import ConnectionMongoDBManager from './connection';
import KeyboardModel from '../../../models/keyboard.model';
import KeyboardsDAO from '../dao/keyboards.DAO';
import KeyboardsContract from '../contracts/keyboards.contract';

export default class KeyboardsDAOImpl extends BaseDAOImpl < KeyboardModel > implements KeyboardsDAO {

  constructor() {
    super(new KeyboardsContract());
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
        category: 'keyboards',
          name: 'Corsair K55',
          price: 47.05,
          stock: 0,
          company: 'Corsair',
          description: 'Decription Corsair K55',
          type: 'azerty'
        },
        {
          category: 'keyboards',
          name: 'Corsair K70 MK.2',
          price: 149.99,
          stock: 1,
          company: 'Corsair',
          description: 'Description Corsair K70 MK.2',
          type: 'azerty'
        },
        {
          category: 'keyboards',
          name: 'Corsair K95 RGB Platinum',
          price: 161.03,
          stock: 2,
          company: 'Corsair',
          description: 'Description Corsair K95 RGB Platinum',
          type: 'azerty'
        },
        {
          category: 'keyboards',
          name: 'Razer Blackwidow Elite',
          price: 116.00,
          stock: 3,
          company: 'Razer',
          description: 'Description Razer Blackwidow Elite',
          type: 'azerty'
        },
        {
          category: 'keyboards',
          name: 'Razer Ornata Chroma',
          price: 86.00,
          stock: 4,
          company: 'Razer',
          description: 'Description Razer Ornata Chroma',
          type: 'azerty'
        },
        {
          category: 'keyboards',
          name: 'Razer Cynosa Chroma',
          price: 75.00,
          stock: 5,
          company: 'Razer',
          description: 'Description Cynosa Chroma',
          type: 'qwerty'
        },
        {
          category: 'keyboards',
          name: 'Razer Huntsman',
          price: 124.30,
          stock: 6,
          company: 'Razer',
          description: 'Description Razer Huntsman',
          type: 'qwerty'
        },
        {
          category: 'keyboards',
          name: 'Logitech G213 Prodigy',
          price: 59.04,
          stock: 7,
          company: 'Logitech',
          description: 'Description Logitech G213 Prodigy',
          type: 'qwerty'
        },
        {
          category: 'keyboards',
          name: 'Logitech G910 Orion Spectrum',
          price: 164.94,
          stock: 8,
          company: 'Logitech',
          description: 'Description Logitech G910 Orion Spectrum',
          type: 'qwerty'
        },
        {
          category: 'keyboards',
          name: 'Logitech G815 Lightspeed',
          price: 179.99,
          stock: 9,
          company: 'Logitech',
          description: 'Description Logitech G815 Lightspeed',
          type: 'qwerty'
        }
      ]);
    if (datas.result.ok === 1) {
      return true;
    } else {
      return false;
    }
  }

  parseIn(item: KeyboardModel): object {
    return {

    };
  }

  parseOut(datas: any): KeyboardModel {
    return new KeyboardModel(
      datas.category,
      datas.name,
      datas.price,
      datas.stock,
      datas.company,
      datas.description,
      datas.type,
      datas._id
    );
  }
}
