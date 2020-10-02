import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

export interface TransactionType {
    txid: string;
    name: string;
    date: number;
    type: string;
    amount: number;
}

const TRANSACTION_DATA: TransactionType[] = [
    { date: Date.now() - 2000333, name: 'Recharge', txid: '0302XD1AF9F.FC3FA4.D32AFF', type: 'Credited', amount: 5000 },
    { date: Date.now() - 1239900, name: 'SMS Campaigning', txid: '02034F1AB0A.AC5FG4.C33AFD', type: 'Debited', amount: 422.75 },
    { date: Date.now(), name: 'Email Campaigning', txid: '236A4G1SB4A.VDC5DGA.453FFA', type: 'Debited', amount: 500.75 }
    // { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' }
];

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

    dataSource: MatTableDataSource<TransactionType>;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    displayedColumns: string[] = Object.keys(TRANSACTION_DATA[0]);


    constructor() {
        this.dataSource = new MatTableDataSource(TRANSACTION_DATA.reverse());
    }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
    }

}
