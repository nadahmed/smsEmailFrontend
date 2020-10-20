import { ApiResponse, GroupData } from './../../../api/api-service.interface';
import { Carrier, SendingService } from './../../../api/sending.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { PopinfoComponent } from 'src/app/extras/popinfo/popinfo.component';


interface ElementData {
    id: string;
    profession: string;
    email: string;
    name: string;
    editable?: boolean;
}


@Component({
  selector: 'app-emaileditcontact',
  templateUrl: './emaileditcontact.component.html',
  styleUrls: ['./emaileditcontact.component.scss']
})
export class EmaileditcontactComponent implements OnInit {

    isBusy = false;
    newGroup = '';
    oldName = '';
    oldEmail = '';
    data: ElementData[] = [];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    displayedColumns: string[] = ['name', 'email', 'profession', 'actions'];
    dataSource = new MatTableDataSource();

    constructor(
        private emailService: SendingService,
        private matDialog: MatDialog,
        private snackBar: MatSnackBar,
        ) {}

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnInit() {
        this.emailService.carrier = Carrier.Email;
        this.isBusy = true;
        this.emailService.getCustomerGroups()
        .subscribe(
            (res: ApiResponse) => {
                console.log(res.data);
                if (!(res.data as GroupData).email) { return; }
                (res.data as GroupData).email.forEach( val => {
                    val.contacts.forEach(contact => {
                        this.data.push({
                            id: contact._id,
                            name: contact.name,
                            email: contact.email,
                            profession: val.groupName,
                        });
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
        const dialog = this.matDialog.open(PopinfoComponent, {
            data: {
                icon: 'delete',
                title: 'Delete Contact',
                message: 'Are you sure you want to delete this contact?',
            }
        });

        dialog.afterClosed().subscribe(ok => {
            if (ok) {
                this.emailService.deleteContact(el.id, el.profession).subscribe( res => {
                    if (res.isExecuted) {
                        this.data.splice(this.data.indexOf(el), 1);
                        this.dataSource.data = this.data;
                    }
                });
            }
        });
    }

    editGroup(el: ElementData) {

        const tempFlag = el.editable;
        this.oldName = el.name;
        this.oldEmail = el.email;
        this.data.forEach( element => {
            element.editable = false;
        });
        el.editable = !tempFlag;
    }

    modifyContact(el: ElementData) {
        const body: {name?: string, email?: string} = {};
        if ( el.name === this.oldName && el.email === this.oldEmail) {
            el.editable = false;
            return;
        }
        if (el.name !== this.oldName) {
            body.name = this.oldName;
        }
        if (el.email !== this.oldEmail) {
            body.email = this.oldEmail;
        }
        this.emailService.modifyContact(el.id, el.profession, body)
        .subscribe( res => {
            if (res.isExecuted) {
                this.data[this.data.indexOf(el)] = {
                    name: this.oldName,
                    email: this.oldEmail,
                    editable: false,
                    profession: el.profession,
                    id: el.id
                    };
                }

            this.dataSource.data = this.data;
            },
             err => {
                 this.snackBar.open(err.error.message, 'Dismiss', {
                     duration: 5000
                 });
             }
        );
    }

    cancelAction( el: ElementData) {
        el.editable = false;
    }

}
