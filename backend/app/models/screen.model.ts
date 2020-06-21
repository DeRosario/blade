import {
  ObjectId
} from 'mongodb';
import ScreenConnectorsModel from './screen-connectors.model';
import ProductModel from './product.model';

export default class ScreenModel extends ProductModel {
  constructor(
    category: string,
    name: string,
    price: number,
    stock: number,
    company: string,
    description: string,
    private inches: number,
    private hz: number,
    private connectors: ScreenConnectorsModel,
    _id: ObjectId | undefined
  ) {
    super(category, name, company, price, stock, description, _id);
  }

  getInches(): number {
    return this.inches;
  }

  setInches(inches: number): void {
    this.inches = inches;
  }

  getHz(): number {
    return this.hz;
  }

  setHz(hz: number): void {
    this.hz = hz;
  }

  getConnectors(): ScreenConnectorsModel {
    return this.connectors;
  }

  setConnectors(connectors: ScreenConnectorsModel): void {
    this.connectors = connectors;
  }

  toJson(): object {
    throw new Error('Method not implemented.');
  }
}
