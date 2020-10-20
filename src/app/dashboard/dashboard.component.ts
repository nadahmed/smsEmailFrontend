import { AuthService } from 'src/app/api/auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy{
    /** Based on the screen size, switch from standard to one column per row */

    balance = 0.0;
    balanceSub: Subscription;
    transactions = [
        {sms: 2200, cost: 1202.34, date: '30 Dec 2019'},
        {sms: 2210, cost: 1101.53, date: '10 Nov 2019'},
        {sms: 2310, cost: 1302.21, date: '1 Nov 2019'},
        {sms: 1500, cost: 2304.87, date: '15 Oct 2019'},
        {sms: 1200, cost: 1232.34, date: '2 Oct 2019'},
];

    cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(({ matches }) => {
            if (matches) {
                return [
                    { title: 'AVAILABLE BALANCE', content: this.balance.toFixed(2), cols: 4, rows: 1 },
                    { title: 'SMS LAST MONTH', content: '1020', cols: 4, rows: 1 },
                    { title: 'EMAILS LAST MONTH', content: '2200', cols: 4, rows: 1 },
                    { title: 'COST LAST MONTH', content: '5521.0', cols: 4, rows: 1 },
                    { title: 'TOTAL CONTACTS', content: '5021', cols: 4, rows: 1 },
                    { title: 'CHART', content: '', cols: 4, rows: 1 },
                    { title: 'RECENT TRANSACTIONS', content: this.transactions, cols: 4, rows: 2 },
                ];
            }

            return [
                { title: 'AVAILABLE BALANCE', content: this.balance.toFixed(2), cols: 1, rows: 1 },
                { title: 'SMS LAST MONTH', content: '1020', cols: 1, rows: 1 },
                { title: 'EMAILS LAST MONTH', content: '2200', cols: 1, rows: 1 },
                { title: 'COST LAST MONTH', content: '5521.0', cols: 1, rows: 1 },
                { title: 'CHART', content: '', cols: 3, rows: 3 },
                { title: 'TOTAL CONTACTS', content: '5021', cols: 1, rows: 1 },
                { title: 'RECENT TRANSACTIONS', content: this.transactions, cols: 1, rows: 2 },
            ];
        })
    );

    constructor(
        private breakpointObserver: BreakpointObserver,
        private auth: AuthService,
        public dialog: MatDialog
        ) { }

    ngOnInit() {
      this.balanceSub = this.auth.balanceSub.subscribe(res => {
        this.balance = res;
      });
    }

    ngOnDestroy() {
      this.balanceSub.unsubscribe();
    }

  }
