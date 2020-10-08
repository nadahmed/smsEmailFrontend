import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmailResponse, EmailService } from 'src/app/api/email/email.service';
import { SMSResponse, SmsService } from 'src/app/api/sms/sms.service';

@Component({
  selector: 'app-emaileditcontact',
  templateUrl: './emaileditcontact.component.html',
  styleUrls: ['./emaileditcontact.component.scss']
})
export class EmaileditcontactComponent implements OnInit {

    isBusy = false;
    newGroup = '';
    oldGroup = '';
    data: {profession: string, email: string, name: string}[] = [];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    displayedColumns: string[] = ['name', 'email', 'profession', 'actions'];
    dataSource = new MatTableDataSource();

    constructor(private emailService: EmailService) {}

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnInit() {
        this.isBusy = true;
        this.emailService.getCustomerGroups()
        .subscribe(
            (res: EmailResponse) => {
                console.log(res.data);
                res.data.forEach( val => {
                    val.contacts.forEach(contact => {
                        this.data.push({
                            name: contact.name,
                            email: contact.email,
                            profession: contact.profession,
                        });
                    })

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
