import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SMSResponse, SmsService } from 'src/app/api/sms/sms.service';

@Component({
    selector: 'app-customersmsgroup',
    templateUrl: './customersmsgroup.component.html',
    styleUrls: ['./customersmsgroup.component.scss']
})
export class CustomersmsgroupComponent implements OnInit {

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    displayedColumns: string[] = ['group', 'contacts'];
    dataSource = new MatTableDataSource();

    isBusy = false;
    constructor(private smsService: SmsService) { }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnInit() {
        this.isBusy = true;
        const data: { group: string, contacts: number; }[] = [];
        this.smsService.getCustomerGroups()
            .subscribe(
                (res: SMSResponse) => {
                    // console.log(res.data);
                    // if (!res.data.length) { return; }
                    res.data.cell.forEach(val => {
                        data.push({
                            group: val.groupName,
                            contacts: val.contacts.length,
                        });
                    });
                },
                err => { this.isBusy = false; },
                () => {
                    this.dataSource = new MatTableDataSource(data);
                    this.dataSource.paginator = this.paginator;
                    this.isBusy = false;
                }
            );
    }

}
