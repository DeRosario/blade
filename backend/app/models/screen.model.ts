import {
  ObjectId
} from 'mongodb';
import Model from './model';
import ScreenConnectorsModel from './screen-connectors.model';

export default class ScreenModel extends Model {
  constructor(
    private category: string,
    private name: string,
    private price: number,
    private stock: number,
    private company: string,
    private description: string,
    private inches: number,
    private hz: number,
    private connectors: ScreenConnectorsModel,
    _id: ObjectId | undefined
  ) {
    super(_id);
  }

  getCategory(): string {
    return this.category;
  }

  setCategory(category: string): void {
    this.category = category;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getPrice(): number {
    return this.price;
  }

  setPrice(price: number): void {
    this.price = price;
  }

  getStock(): number {
    return this.stock;
  }

  setStock(stock: number): void {
    this.stock = stock;
  }

  getCompany(): string {
    return this.company;
  }

  setCompany(company: string): void {
    this.company = company;
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(description: string): void {
    this.description = description;
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
