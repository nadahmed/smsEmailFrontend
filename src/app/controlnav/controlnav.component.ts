import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-controlnav',
  templateUrl: './controlnav.component.html',
  styleUrls: ['./controlnav.component.scss']
})
export class ControlnavComponent implements OnInit {

    navLinks = [
        {label: 'Dashboard', path: '/dashboard'},
        {label: 'Send SMS', path: '/sendsms'},
        {label: 'Send Email', path: '/sendemail'},
        {label: 'Manage Groups', path: '/managegroups'},
        {label: 'Transaction', path: '/transactions'},
    ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(){

  }

}
