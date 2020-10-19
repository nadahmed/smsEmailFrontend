import { Router } from '@angular/router';
import { Observable, config } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { FormControl, Validators, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/api/auth/auth.service';
import { User } from 'firebase';
import { MatSnackBar } from '@angular/material';
import { valHooks } from 'jquery';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
    @ViewChild('scrollBottom', { static: false }) private scrollBottom: ElementRef;



    isBusy = false;

    name = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
    email = new FormControl('', [Validators.required, Validators.email]);
    mobile = new FormControl('', [Validators.required, Validators.pattern('^(?:\\+88|01)?(?:\\d{11}|\\d{13})$')]);
    password = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]);
    password2 = new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(24),
        this.mismatchValidator(this.password)]);

    formGroup = new FormGroup({
        name: this.name,
        email: this.email,
        mobile: this.mobile,
        password: this.password,
        password2: this.password2
    });

    hide = true;



    constructor(
        private afAuth: AuthService,
        private router: Router,
        ) {
     }

    getErrorMessageName() {
        return this.name.invalid ? `Please enter a valid name` :
                '';
    }

    getErrorMessageEmail() {
        return this.email.hasError('required') ? `Please enter your email` :
            this.email.hasError('email') ? 'Not a valid email' :
                '';
    }

    getErrorMessageMobile() {
        return this.mobile.hasError('required') ? `Please enter your mobile number.` :
            this.mobile.hasError('pattern') ? 'Not a valid mobile number' :
                '';
    }

    getErrorMessageP1() {
        return this.password.hasError('required') ? `Please enter a password` :
            this.password.hasError('minlength') ? 'Minimum 8 characters' :
                this.password.hasError('maxlength') ? 'Maximum 24 characters' :
                    '';
    }

    getErrorMessageP2() {
        return this.password2.hasError('required') ? `Please re-enter password` :
        this.password2.hasError('mismatch') ? 'Password does not match' :
                '';
    }

    createUser() {
        this.isBusy = true;
        if (this.formGroup.valid) {
            this.afAuth.SignUp(
                this.name.value,
                this.email.value,
                this.mobile.value,
                this.password2.value
                )
                .subscribe(
                    async (res) => {

                        if (!res.isExecuted) {
                            this.isBusy = false;
                        } else {
                            await this.router.navigate(['verify-email-address', encodeURI(this.email.value)]);
                        }
                    },
                    _ => {
                        this.isBusy = false;
                    },
                    () => {
                    }
                );
        }
    }

    get matched() {
        return this.password2.valid;
    }


    mismatchValidator(name: FormControl): ValidatorFn {

        return (control: AbstractControl): { [key: string]: any } | null => {
            const forbidden = control.value !== name.value;
            return forbidden ? { mismatch: { value: control.value } } : null;
        };
    }
}
