import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

navLinks = [
    {path: '/login', label: 'LOG IN' },
    {path: '/signup', label: 'SIGN UP' },
];
  constructor() { }

  ngOnInit() {
  }

}
