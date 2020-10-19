import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/api/auth/auth.service';

@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['./verifyemail.component.scss']
})
export class VerifyemailComponent implements OnInit {

    email = new FormControl('', [Validators.required, Validators.email]);

    timeUp = true;

  constructor(
      public auth: AuthService,
      private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit() {
      this.activatedRoute.params.subscribe(res => {
        if (!!res.email) {
            this.email.setValue(res.email);
        }
      });
  }

  sendVerificationMail() {
    if (this.email.valid) {
        this.timeUp = false;
        this.auth.SendVerificationMail(this.email.value).subscribe(
            res => {
            },
            _ => {
                this.timeUp = true;
            });
    }
  }

}
