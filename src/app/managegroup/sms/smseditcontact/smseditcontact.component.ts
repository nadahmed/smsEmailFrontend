import { ApiResponse, GroupData } from './../../../api/api-service.interface';
import { Carrier, SendingService } from './../../../api/sending.service';
import { PopinfoComponent } from './../../../extras/popinfo/popinfo.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';


interface ElementData {
    id: string;
    profession: string;
    cell: string;
    name: string;
    editable?: boolean;
}

@Component({
  selector: 'app-smseditcontact',
  templateUrl: './smseditcontact.component.html',
  styleUrls: ['./smseditcontact.component.scss']
})
export class SmseditcontactComponent implements OnInit {

    isBusy = false;
    newGroup = '';
    oldName = '';
    oldCell = '';
    data: ElementData[] = [];
    // oldGroup = new FormGroup({
    //     name: new FormControl('', [Validators.required]),
    //     cell: new FormControl('', [Validators.required, Validators.pattern('^(?:\\+?88)?01[13-9]\\d{8}$')])
    // });

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    displayedColumns: string[] = ['name', 'cell', 'profession', 'actions'];
    dataSource = new MatTableDataSource();

    constructor(
        private smsService: SendingService,
        private matDialog: MatDialog,
        private snackBar: MatSnackBar,
        ) {}

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnInit() {
        this.smsService.carrier = Carrier.Sms;
        this.isBusy = true;
        this.smsService.getCustomerGroups()
        .subscribe(
            (res: ApiResponse) => {
                if (!(res.data as GroupData).cell) { return; }
                (res.data as GroupData).cell.forEach( val => {
                    val.contacts.forEach(contact => {
                        this.data.push({
                            id: contact._id,
                            name: contact.name,
                            cell: contact.cell,
                            profession: val.groupName,
                        });
                    });

                });
            },
            err => {
                this.isBusy = false;
            },
            () => {
                this.dataSource = new MatTableDataSource<ElementData>(this.data);
                this.dataSource.paginator = this.paginator;
                this.isBusy = false;
            });
    }

    deleteGroup(el: ElementData) {

        const dialog = this.matDialog.open(PopinfoComponent, {
            data: {
                icon: 'delete',
                title: 'Delete Contact',
                message: 'Are you sure you want to delete this contact?',
            }
        });

        dialog.afterClosed().subscribe(ok => {
            if (ok) {
                this.smsService.deleteContact(el.id, el.profession).subscribe( res => {
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
        this.oldCell = el.cell;
        this.data.forEach( element => {
            element.editable = false;
        });
        el.editable = !tempFlag;
    }

    modifyContact(el: ElementData) {
        const body: {name?: string, cell?: string} = {};
        if ( el.name === this.oldName && el.cell === this.oldCell) {
            el.editable = false;
            return;
        }
        if (el.name !== this.oldName) {
            body.name = this.oldName;
        }
        if (el.cell !== this.oldCell) {
            body.cell = this.oldCell;
        }
        this.smsService.modifyContact(el.id, el.profession, body)
        .subscribe( res => {
            if (res.isExecuted) {
                this.data[this.data.indexOf(el)] = {
                    name: this.oldName,
                    cell: this.oldCell,
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
