import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationLoggedComponent } from './application-logged.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path: '', component: ApplicationLoggedComponent, children: [
     { path: 'home', loadChildren: () => import('../home/home.module').then(mod => mod.HomeModule), canActivate: [AuthGuard] },
     { path: 'product', loadChildren: () => import('../view-product/view-product.module').then(mod => mod.ViewProductModule), canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  declarations: [
    ApplicationLoggedComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ApplicationLoggedModule { }
