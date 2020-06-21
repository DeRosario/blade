import {
  ProductInterface, ProductModel
} from '../view-product/product.model';

export interface MouseDBInterface extends ProductInterface {
  buttons: number;
}

export class MouseModel extends ProductModel {
  constructor(
    id: string,
    category: string,
    name: string,
    company: string,
    price: number,
    stock: number,
    description: string,
    private buttons: number
  ) {
    super(id, category, name, company, price, stock, description);
  }

  getButtons(): number {
    return this.buttons;
  }

  setButtons(buttons: number): void {
    this.buttons = buttons;
  }
}
