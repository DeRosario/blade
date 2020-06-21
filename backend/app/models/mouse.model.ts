import {
  ObjectId
} from 'mongodb';
import ProductModel from './product.model';

export default class MouseModel extends ProductModel {

  constructor(
    category: string,
    name: string,
    price: number,
    stock: number,
    company: string,
    description: string,
    private buttons: number,
    _id: ObjectId | undefined
  ) {
    super(category, name, company, price, stock, description, _id);
  }

  getButtons(): number {
    return this.buttons;
  }

  setButtons(buttons: number): void {
    this.buttons = buttons;
  }

  toJson(): object {
    throw new Error('Method not implemented.');
  }
}
