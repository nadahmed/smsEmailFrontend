import { Component, OnInit, Input } from '@angular/core';

export interface Element {
    sms: number;
    cost: number;
    date: string;
}


@Component({
    selector: 'app-recent-tranx',
    templateUrl: './recent-tranx.component.html',
    styleUrls: ['./recent-tranx.component.scss']
})
export class RecentTranxComponent implements OnInit {
    @Input() tranxData: Element;
    displayedColumns: string[] = ['sms', 'cost', 'date'];
    dataSource: Element;
    constructor() { }

    ngOnInit() {
        this.dataSource = this.tranxData;
    }

}
