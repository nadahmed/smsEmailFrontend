import { Component, OnInit } from '@angular/core';

export interface Group {
    value: string;
    viewValue: string;
  }

@Component({
  selector: 'app-smsaddcontact',
  templateUrl: './smsaddcontact.component.html',
  styleUrls: ['./smsaddcontact.component.scss']
})
export class SmsaddcontactComponent implements OnInit {

    groups: Group[] = [
        {value: 'engineer', viewValue: 'Engineers'},
        {value: 'doctor', viewValue: 'Doctors'},
        {value: 'student', viewValue: 'Students'}
      ];

  constructor() { }

  ngOnInit() {
  }

}
