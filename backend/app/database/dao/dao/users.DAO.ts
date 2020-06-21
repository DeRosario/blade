import BaseDAO from './base.DAO';
import UserModel from '../../../models/user.model';

export default interface UsersDAO extends BaseDAO<UserModel> {

  getUserByEmail(email: string): Promise<UserModel>;

}
