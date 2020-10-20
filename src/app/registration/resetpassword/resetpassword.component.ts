import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/api/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
    selector: 'app-resetpassword',
    templateUrl: './resetpassword.component.html',
    styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

    hide = [true, true, true];

    token = '';
    newpass = new FormControl('', [Validators.required, Validators.minLength(8)]);

    passwordGroup = new FormGroup({
        newpass: this.newpass,
        confirmpass: new FormControl('', [Validators.required, this.mismatchValidator(this.newpass)]),
    });

    constructor(
        private auth: AuthService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.params.subscribe((res: { token: string; }) => {
            this.token = res.token;

        });
    }

    mismatchValidator(name: FormControl): ValidatorFn {

        return (control: AbstractControl): { [key: string]: any; } | null => {
            const forbidden = control.value !== name.value;
            return forbidden ? { mismatch: { value: control.value } } : null;
        };
    }

    resetPassword() {
        if (this.passwordGroup.valid) {
            this.auth.resetPassword(this.token, this.newpass.value).subscribe( res => {
                console.log(res);
            });
        }
    }
}
