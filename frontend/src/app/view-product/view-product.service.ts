import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ViewProductService {

  constructor(private http: HttpClient) { }

  getProduct(category: string, id: string) {
    return this.http.get<any>(`/api/${category}/${id}`);
  }

  removeAllStock(category: string, id: string) {
    return this.http.put<any>(`/api/${category}/${id}`, {stock: 0});
  }

  removeStock(category: string, id: string, stock: number) {
    return this.http.put<any>(`/api/${category}/${id}`, { stock });
  }

  addStock(category: string, id: string, stock: number) {
    return this.http.put<any>(`/api/${category}/${id}`, { stock });
  }
}
