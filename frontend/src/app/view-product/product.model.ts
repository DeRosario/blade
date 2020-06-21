import { ScreenConnectorsModel } from '../models/screen-connectors.model';

export interface ProductInterface {
  _id: string;
  category: string;
  name: string;
  company: string;
  price: number;
  stock: number;
  description: string;
}

export abstract class ProductModel {
  constructor(
    private id: string,
    private category: string,
    private name: string,
    private company: string,
    private price: number,
    private stock: number,
    private description: string,
  ) {}

  getId(): string {
    return this.id;
  }

  getCategory(): string {
    return this.category;
  }

  getName(): string {
    return this.name;
  }

  getCompany(): string {
    return this.company;
  }

  getPrice(): number {
    return this.price;
  }

  getStock(): number {
    return this.stock;
  }

  setStock(stock: number) {
    this.stock = stock;
  }

  getDescription(): string {
    return this.description;
  }

  getType?(): string;

  getButtons?(): number;

  getHz?(): number;

  getInches?(): number;

  getConnectors?(): ScreenConnectorsModel;
}
