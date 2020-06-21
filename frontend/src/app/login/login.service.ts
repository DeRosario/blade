import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(body: {email: string, password: string}) {
    return this.http.post <any>('/connection/login', body);
  }

  addUser() {
    const user = {
      firstName: 'UserFirstName',
      lastName: 'UserLastName',
      email: 'user@mail.com',
      password: 'bladeTest2020!'
    };
    return this.http.post<any>('/connection/create', user);
  }

  setupDatabase() {
    return this.http.get<{message: string}>('/database/setup');
  }


}
