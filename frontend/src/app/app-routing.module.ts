import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule), canActivate: [LoginGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '', loadChildren: () => import('./application-logged/application-logged.module').then(mod => mod.ApplicationLoggedModule), pathMatch: 'prefix' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
