import {
  Component,
  OnInit
} from '@angular/core';
import {
  NavbarService
} from './navbar.service';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NavbarService]
})
export class NavbarComponent implements OnInit {
  open = false;
  constructor(private navbarService: NavbarService, private router: Router) {}

  ngOnInit() {}

  onLogout() {
    this.navbarService.logout().subscribe((res) => {
      if (res.message === 'You have been disconnected.' || res.message === 'You are already disconnected.') {
        this.router.navigateByUrl('/login');
      }
    });
  }

  openMenu(open: boolean) {
    this.open = !open;
  }
}
