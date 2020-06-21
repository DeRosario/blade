import { ObjectId } from 'mongodb';
import Model from './model';

export default abstract class ProductModel extends Model {

  constructor(
    private category: string,
    private name: string,
    private company: string,
    private price: number,
    private stock: number,
    private description: string,
    _id?: ObjectId | undefined) {
    super(_id)
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

}
