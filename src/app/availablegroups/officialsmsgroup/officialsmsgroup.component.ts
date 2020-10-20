import { SMSResponse, OfficialSMSGroupdata } from './../../api/sms/sms.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { SmsService } from 'src/app/api/sms/sms.service';


@Component({
  selector: 'app-officialsmsgroup',
  templateUrl: './officialsmsgroup.component.html',
  styleUrls: ['./officialsmsgroup.component.scss']
})
export class OfficialsmsgroupComponent implements OnInit {

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    displayedColumns: string[] = ['group', 'contacts'];
    dataSource = new MatTableDataSource();

    isBusy = true;

    constructor(private smsService: SmsService) {}

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnInit() {
        this.isBusy = true;
        const data: {group: string, contacts: number}[] = [];
        this.smsService.getOfficialGroups()
        .subscribe(
            (res: SMSResponse) => {
                if (!!res.data.cell) {
                res.data.cell.forEach( val => {
                    data.push({
                        group: val.groupName,
                        contacts: val.contacts.length,
                    });
                });
            }
            },
            err => {
                this.isBusy = false;
            },
            () => {
                this.dataSource = new MatTableDataSource(data);
                this.dataSource.paginator = this.paginator;
                this.isBusy = false;
            }
            );

    }

}
