import {
  ProductModel, ProductInterface
} from '../view-product/product.model';

export interface KeyboardDBInterface extends ProductInterface {
  type: string;
}

export class KeyboardModel extends ProductModel {
  constructor(
    id: string,
    category: string,
    name: string,
    company: string,
    price: number,
    stock: number,
    description: string,
    private type: string
  ) {
    super(id, category, name, company, price, stock, description);
  }

  getType(): string {
    return this.type;
  }

  setType(type: string): void {
    this.type = type;
  }
}
