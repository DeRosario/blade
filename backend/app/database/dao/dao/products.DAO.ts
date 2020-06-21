import BaseDAO from './base.DAO';

export default interface ProductsDAO <T> extends BaseDAO <T> {

  insertAll(): Promise < boolean > ;

  changeStock(_id: string, stock: number): Promise <boolean>;
}
