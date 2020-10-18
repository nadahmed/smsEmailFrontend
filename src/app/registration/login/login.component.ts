import { Router } from '@angular/router';
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
  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }


  getErrorMessage() {
    return this.formGroup.get('email').hasError('required') ? `Please enter your email` :
        this.formGroup.get('email').hasError('email') ? 'Not a valid email' :
            '';
  }

  signIn() {
      if (this.formGroup.valid) {
        this.isBusy = true;
        this.auth.SignIn(this.formGroup.get('email').value, this.formGroup.get('password').value).subscribe(
            _ => {},
            async (error) => {
                this.isBusy = false;
                if(error.error.message === 'Account is not acctivated') {
                    await this.router.navigate(['verify-email-address', encodeURI(this.formGroup.get('email').value)]);
                }

            },
            () => {
            }
            );
      }
  }

}
