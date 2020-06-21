import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NavbarService {

  constructor(private http: HttpClient) { }

  logout() {
    return this.http.get<any>('api/users/logout');
  }
}
