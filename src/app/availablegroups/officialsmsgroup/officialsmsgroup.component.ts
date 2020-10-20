import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { SmsService } from 'src/app/api/sms/sms.service';
import { Carrier, SendingService } from 'src/app/api/sending.service';
import { ApiResponse, GroupData } from 'src/app/api/api-service.interface';


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

    constructor(private smsService: SendingService) {}

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnInit() {
        this.smsService.carrier = Carrier.Sms;
        this.isBusy = true;
        const data: {group: string, contacts: number}[] = [];
        this.smsService.getOfficialGroups()
        .subscribe(
            (res: ApiResponse) => {
                if (!(res.data as GroupData).cell) { return; }
                (res.data as GroupData).cell.forEach( val => {
                    data.push({
                        group: val.groupName,
                        contacts: val.contacts.length,
                    });
                });
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
