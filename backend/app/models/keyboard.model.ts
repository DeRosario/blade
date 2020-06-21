import {
  ObjectId
} from 'mongodb';
import ProductModel from './product.model';

export default class KeyboardModel extends ProductModel {

  constructor(
    category: string,
    name: string,
    price: number,
    stock: number,
    company: string,
    description: string,
    private type: string,
    _id: ObjectId | undefined
  ) {
    super(category, name, company, price, stock, description, _id);
  }

  getType(): string {
    return this.type;
  }

  setType(type: string): void {
    this.type = type;
  }

  toJson(): object {
    throw new Error('Method not implemented.');
  }
}
