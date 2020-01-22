import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/api/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required]);
    hide = true;
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }


  getErrorMessage() {
    return this.email.hasError('required') ? `Please enter your email` :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

}
