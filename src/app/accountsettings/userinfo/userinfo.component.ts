import { AuthService } from 'src/app/api/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {

  constructor(public auth: AuthService) { }

  tableData1 = {
      Name: this.auth.user.name,
      Username: this.auth.user.userName,
      Email: this.auth.user.email,
      'Verified Account': this.auth.user.isVerified ? 'Yes' : 'No',
  };

  tableLable1 = Object.keys(this.tableData1);

  tableData2 = {
    'Email unit cost': '৳' + this.auth.user.emailUnitCost,
    'SMS unit cost': '৳' + this.auth.user.smsUnitCost,
};

tableLable2 = Object.keys(this.tableData2);

  ngOnInit() {
  }

}
