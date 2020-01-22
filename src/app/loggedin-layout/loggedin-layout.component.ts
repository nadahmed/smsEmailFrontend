import { User } from './../api/auth/user';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../api/auth/auth.service';

@Component({
  selector: 'app-loggedin-layout',
  templateUrl: './loggedin-layout.component.html',
  styleUrls: ['./loggedin-layout.component.scss']
})
export class LoggedinLayoutComponent {

    opened = true;
    user: User = JSON.parse(localStorage.getItem('user'));

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );

    constructor(
        private breakpointObserver: BreakpointObserver,
        public auth: AuthService,
        ) {}
}
