import { FormGroup, FormControl, ValidatorFn, AbstractControl, Validators } from '@angular/forms';
import { AuthService } from './../../api/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

    hide = [true, true, true];

    newpass = new FormControl('', [Validators.required]);

    passwordGroup = new FormGroup({
        oldpass: new FormControl('', [Validators.required]),
        newpass: this.newpass,
        confirmpass: new FormControl('', [Validators.required, this.mismatchValidator(this.newpass)]),
    });

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  mismatchValidator(name: FormControl): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
        const forbidden = control.value !== name.value;
        return forbidden ? { mismatch: { value: control.value } } : null;
    };
}

}
