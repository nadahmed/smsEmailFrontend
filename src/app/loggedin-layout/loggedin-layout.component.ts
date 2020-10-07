import { UserData } from './../api/auth/user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../api/auth/auth.service';

@Component({
  selector: 'app-loggedin-layout',
  templateUrl: './loggedin-layout.component.html',
  styleUrls: ['./loggedin-layout.component.scss']
})
export class LoggedinLayoutComponent implements OnInit, OnDestroy {

  balance =  0.0;
  balanceSub: Subscription;

    opened = true;
    user: UserData = JSON.parse(localStorage.getItem('user'));

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );

    constructor(
        private breakpointObserver: BreakpointObserver,
        public auth: AuthService,
        ) {}

        ngOnInit() {
          this.balanceSub = this.auth.balance.subscribe(res => {
            this.balance = res;
          });
        }

        ngOnDestroy() {
          this.balanceSub.unsubscribe();
        }

      }
