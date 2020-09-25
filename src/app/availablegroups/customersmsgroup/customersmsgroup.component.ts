import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OfficialSMSGroupResponse, SmsService } from 'src/app/api/sms/sms.service';

@Component({
    selector: 'app-customersmsgroup',
    templateUrl: './customersmsgroup.component.html',
    styleUrls: ['./customersmsgroup.component.scss']
})
export class CustomersmsgroupComponent implements OnInit {

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    displayedColumns: string[] = ['group', 'contacts'];
    dataSource = new MatTableDataSource();

    constructor(private smsService: SmsService) { }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnInit() {
        const data: { group: string, contacts: number; }[] = [];
        this.smsService.getCustomerGroups()
            .subscribe(
                (res: OfficialSMSGroupResponse) => {
                    console.log(res.data);
                    if (!res.data.length) {return; }
                    res.data.forEach(val => {
                        data.push({
                            group: val.professionGroup,
                            contacts: val.contacts.length,
                        });
                    });
                },
                err => { },
                () => {
                    this.dataSource = new MatTableDataSource(data);
                    this.dataSource.paginator = this.paginator;
                }
            );
    }

}
