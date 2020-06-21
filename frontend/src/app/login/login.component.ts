import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  LoginService
} from './login.service';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  creationUserMessage = {
    message: '',
    color: ''
  };

  creationDatabaseMessage = {
    message: '',
    color: ''
  };

  logginError = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  onSubmit(formValue) {
    this.loginService.login(formValue).subscribe((connection) => {
      console.log(connection);
      if (connection.logged) {
        this.router.navigateByUrl('/home');
      }
    }, (error) => {
      this.logginError = true;
    });
  }

  createUser() {
    this.loginService.addUser().subscribe((result) => {
      this.creationUserMessage = {
        message: 'User created. Username: user@mail.com. Password: bladeTest2020!',
        color: '#2cb16e'
      };
    }, (error) => {
      if (error.error.message === 'Email already exist.') {
        this.creationUserMessage = {
          message: 'Account already active. Username: user@mail.com Password: bladeTest2020!',
          color: '#fdc90a'
        };
      }
    });
  }

  createDatabase() {
    this.loginService.setupDatabase().subscribe((result) => {
      this.creationDatabaseMessage = {
        message: result.message,
        color: '#2cb16e'
      };
      if (result.message === 'Database is already setup') {
        this.creationDatabaseMessage.color = '#fdc90a';
      }
    }, (error) => {
      this.creationDatabaseMessage = {
        message: error.error.message,
        color: '#de3131'
      };
    });
  }

}
