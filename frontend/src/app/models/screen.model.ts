import {
  ScreenConnectorsModel,
  ScreenConnectorsDBInterface
} from './screen-connectors.model';
import {
  ProductInterface,
  ProductModel
} from '../view-product/product.model';

export interface ScreenDBInterface extends ProductInterface {
  inches: number;
  hz: number;
  connectors: ScreenConnectorsDBInterface;
}

export class ScreenModel extends ProductModel {
  constructor(
    id: string,
    category: string,
    name: string,
    company: string,
    price: number,
    stock: number,
    description: string,
    private inches: number,
    private hz: number,
    private connectors
  ) {
    super(id, category, name, company, price, stock, description);
    this.connectors = new ScreenConnectorsModel(this.connectors.vga, this.connectors.hdmi, this.connectors.displayPort);
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
}
