import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/api/auth/auth.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
      ]);
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
