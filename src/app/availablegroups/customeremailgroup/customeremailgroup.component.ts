import { GroupData } from 'src/app/api/api-service.interface'
import { Carrier, SendingService } from './../../api/sending.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiResponse } from 'src/app/api/api-service.interface';

export interface PeriodicElement {
    group: string;
    contacts: number;
}

@Component({
    selector: 'app-customeremailgroup',
    templateUrl: './customeremailgroup.component.html',
    styleUrls: ['./customeremailgroup.component.scss']
})
export class CustomeremailgroupComponent implements OnInit {

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    displayedColumns: string[] = ['group', 'contacts'];
    dataSource = new MatTableDataSource();

    isBusy = false;

    constructor(private emailService: SendingService) {
      
     }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnInit() {
        this.emailService.carrier = Carrier.Email;
        
        this.isBusy = true;
        const data: { group: string, contacts: number; }[] = [];
        this.emailService.getCustomerGroups()
            .subscribe(
                (res: ApiResponse) => {
                    // console.log(res.data);
                    if (!(res.data as GroupData).email) {return; }
                    (res.data as GroupData).email.forEach(val => {
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
