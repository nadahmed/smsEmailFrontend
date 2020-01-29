import { Observable, config } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { FormControl, Validators, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/api/auth/auth.service';
import { User } from 'firebase';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
    @ViewChild('scrollBottom', { static: false }) private scrollBottom: ElementRef;

    formGroup = new FormGroup({});

    name = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]);
    password2 = new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(24),
        this.mismatchValidator(this.password)]);

    hide = true;
    constructor(
        private afAuth: AuthService,
        private snackBar: MatSnackBar,
        ) {
        this.formGroup.addControl('name', this.name);
        this.formGroup.addControl('email', this.email);
        this.formGroup.addControl('password', this.password);
        this.formGroup.addControl('password2', this.password2);
     }

    getErrorMessageName() {
        return this.name.invalid ? `Please enter a valid name` :
                '';
    }

    getErrorMessage() {
        return this.email.hasError('required') ? `Please enter your email` :
            this.email.hasError('email') ? 'Not a valid email' :
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

    async createUser() {

        if (this.email.valid && this.password2.valid && this.name.valid) {
            // tslint:disable-next-line: max-line-length
            this.afAuth.SignUp(this.email.value, this.password2.value)
            .then(async (result) => {
                /* Call the SendVerificaitonMail() function when new user sign
                up and returns promise */
                await result.user.updateProfile({displayName: this.name.value})
                await this.afAuth.SendVerificationMail();
                await this.afAuth.SetUserData(result.user);
            })
            .catch(err => {
                this.snackBar.open(err, 'dismiss', {
                    duration: 2000,
                });
                // alert(err);
            });

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
