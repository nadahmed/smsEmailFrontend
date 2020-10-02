import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/api/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    isBusy = false;
    formGroup = new FormGroup(
        {
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        }
    );

    hide = true;
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }


  getErrorMessage() {
    return this.formGroup.get('email').hasError('required') ? `Please enter your email` :
        this.formGroup.get('email').hasError('email') ? 'Not a valid email' :
            '';
  }

  signIn() {
      console.log('Clicked');
      if (this.formGroup.valid) {
        this.isBusy = true;
        this.auth.SignIn(this.formGroup.get('email').value, this.formGroup.get('password').value).subscribe(
            _ => {},
            _ => {
                this.isBusy = false;
            },
            () => {
            }
            );
      }
  }

}
