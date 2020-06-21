import {
  ObjectId
} from 'mongodb';
import Model from './model';

export default class MouseModel extends Model {

  constructor(
    private category: string,
    private name: string,
    private price: number,
    private stock: number,
    private company: string,
    private description: string,
    private buttons: number,
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
