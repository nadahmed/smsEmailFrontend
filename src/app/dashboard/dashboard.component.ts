import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    /** Based on the screen size, switch from standard to one column per row */

    cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(({ matches }) => {
            if (matches) {
                return [
                    { footer: 'AVAILABLE BALANCE', content: 'tk '+'120.0', cols: 4, rows: 1 },
                    { footer: 'SMS LAST WEEK', content: '1020', cols: 4, rows: 1 },
                    { footer: 'COST LAST WEEK', content: '201.25' + ' TK', cols: 4, rows: 1 },
                    { footer: 'SMS LAST MONTH', content: '55210', cols: 4, rows: 1 },
                    { footer: 'COST LAST MONTH', content: '5021.20' + ' TK', cols: 4, rows: 1 },
                    { footer: '', content: 'chart', cols: 4, rows: 2 },
                    { footer: 'LAST 5 TRANSACTIONS', content: '120.0', cols: 4, rows: 3 },
                ];
            }

            return [
                { footer: 'SMS LAST WEEK', content: '1020', cols: 1, rows: 1 },
                { footer: 'COST LAST WEEK', content: '201.25' + ' TK', cols: 1, rows: 1 },
                { footer: 'SMS LAST MONTH', content: '55210', cols: 1, rows: 1 },
                { footer: 'COST LAST MONTH', content: '5021.20' + ' TK', cols: 1, rows: 1 },
                { footer: '', content: 'chart', cols: 3, rows: 4 },
                { footer: 'AVAILABLE BALANCE', content: '120.0' + ' TK', cols: 1, rows: 1 },
                { footer: 'RECENT TRANSACTIONS', content: '', cols: 1, rows: 3 },
            ];
        })
    );

    constructor(private breakpointObserver: BreakpointObserver) { }
}
