import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OfficialSMSGroupResponse, SmsService } from 'src/app/api/sms/sms.service';

@Component({
  selector: 'app-smseditcontact',
  templateUrl: './smseditcontact.component.html',
  styleUrls: ['./smseditcontact.component.scss']
})
export class SmseditcontactComponent implements OnInit {

    isBusy = false;
    newGroup = '';
    oldGroup = '';
    data: {group: string, contacts: number}[] = [];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    displayedColumns: string[] = ['group', 'contacts', 'actions'];
    dataSource = new MatTableDataSource();

    constructor(private smsService: SmsService) {}

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnInit() {
        this.isBusy = true;
        this.smsService.getCustomerGroups()
        .subscribe(
            (res: OfficialSMSGroupResponse) => {
                console.log(res.data);
                res.data.forEach( val => {
                    this.data.push({
                        group: val.professionGroup,
                        contacts: val.contacts.length,
                    });
                });
            },
            err => {
                this.isBusy = false;
            },
            () => {
                this.dataSource = new MatTableDataSource(this.data);
                this.dataSource.paginator = this.paginator;
                this.isBusy = false;
            });
    }

    deleteGroup(el) {

    }

    editGroup(el) {

    }

    addGroup() {
    }

}
