import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return await this.http.get<boolean>('/connection/check-auth').toPromise().then(
      (value) => {
        if (!value) {
          return true;
        } else {
          this.router.navigateByUrl('/home');
        }
      });
  }
}
