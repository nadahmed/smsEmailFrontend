import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/api/auth/auth.service';

@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['./verifyemail.component.scss']
})
export class VerifyemailComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
