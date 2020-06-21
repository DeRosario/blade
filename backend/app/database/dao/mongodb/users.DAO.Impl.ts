import BaseDAOImpl from './base.DAO.Impl';
import {
  Db
} from 'mongodb';
import ConnectionMongoDBManager from './connection';
import UsersDAO from '../dao/users.DAO';
import UsersContract from '../contracts/users.contract';
import UserModel from '../../../models/user.model';

export default class UsersDAOImpl extends BaseDAOImpl < UserModel > implements UsersDAO {

  constructor() {
    super(new UsersContract());
  }

  async getUserByEmail(email: string): Promise<any> {
    const dbConnection: Db = await ConnectionMongoDBManager.getDb();
    const data = await dbConnection.collection(this.getContract().getCollection()).findOne({
      email: email
    });
    if (data !== null && data !== undefined) {
      const result: UserModel = this.parseOut(data);
      return result;
    } else {
      return undefined;
    }
  }

  parseIn(item: UserModel) {
    return {

    };
  }

  parseOut(datas: any): UserModel {
    return new UserModel(
      datas.lastName,
      datas.firstName,
      datas.email,
      datas.password,
      datas._id
    );
  }
}
