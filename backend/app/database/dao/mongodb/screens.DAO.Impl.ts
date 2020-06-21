import BaseDAOImpl from './base.DAO.Impl';
import {
  Db, ObjectID
} from 'mongodb';
import ConnectionMongoDBManager from './connection';
import ScreenModel from '../../../models/screen.model';
import ScreensDAO from '../dao/screens.DAO';
import ScreensContract from '../contracts/screens.contract';

export default class ScreensDAOImpl extends BaseDAOImpl < ScreenModel > implements ScreensDAO {

  constructor() {
    super(new ScreensContract());
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
          category: 'screens',
          name: 'BenQ LED - GW2283',
          price: 109.94,
          stock: 0,
          company: 'BenQ',
          description: 'Decription BenQ LED - GW2283',
          inches: 22.0,
          hz: 120,
          connectors: {
            vga: 1,
            hdmi: 1,
            displayPort: 1
          }
        },
        {
          category: 'screens',
          name: 'BenQ LED - BL2381T',
          price: 189.95,
          stock: 1,
          company: 'BenQ',
          description: 'Description BenQ LED - BL2381T',
          inches: 25.0,
          hz: 120,
          connectors: {
            vga: 0,
            hdmi: 1,
            displayPort: 2
          }
        },
        {
          category: 'screens',
          name: 'BenQ LED - GW2480',
          price: 137.94,
          stock: 2,
          company: 'BenQ',
          description: 'Description BenQ LED - GW2480',
          inches: 29.0,
          hz: 120,
          connectors: {
            vga: 1,
            hdmi: 1,
            displayPort: 1
          }
        },
        {
          category: 'screens',
          name: 'Dell LED - E1715S',
          price: 139.94,
          stock: 3,
          company: 'Dell',
          description: 'Description Dell LED - E1715S',
          inches: 22,
          hz: 60,
          connectors: {
            vga: 1,
            hdmi: 1,
            displayPort: 0
          }
        },
        {
          category: 'screens',
          name: 'Dell LED - P2219H',
          price: 189.95,
          stock: 4,
          company: 'Dell',
          description: 'Description Dell LED - P2219H',
          inches: 25,
          hz: 60,
          connectors: {
            vga: 0,
            hdmi: 1,
            displayPort: 2
          }
        },
        {
          category: 'screens',
          name: 'Dell LED - SE2216H',
          price: 99.95,
          stock: 5,
          company: 'Dell',
          description: 'Description LED - SE2216H',
          inches: 28,
          hz: 60,
          connectors: {
            vga: 1,
            hdmi: 1,
            displayPort: 0
          }
        },
        {
          category: 'screens',
          name: 'Dell LED - SE2219H',
          price: 119.94,
          stock: 6,
          company: 'Dell',
          description: 'Description Dell LED - SE2219H',
          inches: 26,
          hz: 60,
          connectors: {
            vga: 1,
            hdmi: 1,
            displayPort: 1
          }
        },
        {
          category: 'screens',
          name: 'Alienware AW2521HF',
          price: 399.95,
          stock: 7,
          company: 'Alienware',
          description: 'Description Alienware AW2521HF',
          inches: 32,
          hz: 240,
          connectors: {
            vga: 0,
            hdmi: 1,
            displayPort: 2
          }
        },
        {
          category: 'screens',
          name: 'Alienware AW2720HF',
          price: 479.95,
          stock: 8,
          company: 'Alienware',
          description: 'Description Alienware AW2720HF',
          inches: 22,
          hz: 240,
          connectors: {
            vga: 0,
            hdmi: 1,
            displayPort: 2
          }
        },
        {
          category: 'screens',
          name: 'Alienware AW3420DW',
          price: 1199.94,
          stock: 9,
          company: 'Alienware',
          description: 'Description Alienware AW3420DW',
          inches: 25,
          hz: 240,
          connectors: {
            vga: 0,
            hdmi: 1,
            displayPort: 2
          }
        }
      ]);
    if (datas.result.ok === 1) {
      return true;
    } else {
      return false;
    }
  }

  parseIn(item: ScreenModel): object {
    return {

    };
  }

  parseOut(datas: any): ScreenModel {
    return new ScreenModel(
      datas.category,
      datas.name,
      datas.price,
      datas.stock,
      datas.company,
      datas.description,
      datas.inches,
      datas.hz,
      datas.connectors,
      datas._id
    );
  }
}
