import { GroupAddBody } from './../../api/sms/sms.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OfficialSMSGroupResponse, SmsService } from 'src/app/api/sms/sms.service';

export interface PeriodicElement {
    id: number;
    group: string;
    contacts: number;
    editable: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { id: 0, group: 'Engineers', contacts: 2000, editable: false },
    { id: 1, group: 'Doctors', contacts: 6152, editable: false },
    { id: 2, group: 'House wives', contacts: 120, editable: false  },
    { id: 3, group: 'Truck drivers', contacts: 150, editable: false  },
    { id: 4, group: 'Lawyers', contacts: 1120, editable: false  },
    { id: 5, group: 'Salesmen', contacts: 1320, editable: false  },
    { id: 6, group: 'Pivate car drivers', contacts: 204, editable: false  },
    { id: 7, group: 'BBA Students', contacts: 66, editable: false  },
    { id: 8, group: 'BSc Students', contacts: 1203, editable: false  },
    { id: 9, group: 'School Students', contacts: 1233, editable: false  },
];

/**
 * @title Table with filtering
 */
@Component({
    selector: 'app-smseditgroup',
    templateUrl: './smseditgroup.component.html',
    styleUrls: ['./smseditgroup.component.scss']
})
export class SmseditgroupComponent implements OnInit {


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

    deleteGroup(el: PeriodicElement) {

        if (!el.editable) {
            ELEMENT_DATA.splice(ELEMENT_DATA.findIndex(v => v.id === el.id), 1);
            // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
            this.dataSource.data = ELEMENT_DATA;
        } else {
            ELEMENT_DATA.forEach(v => {
                v.editable = false;
            })
        }

    }

    editGroup(el: PeriodicElement) {
        if (!el.editable) {
            this.oldGroup = el.group;
        }
        ELEMENT_DATA.forEach(v => {
            if (v.id === el.id) {
                v.editable = !v.editable;
                if (v.editable) {
                    console.log('CLICKED EDIT');
                } else {
                    console.log('CLICKED OK', this.oldGroup);
                    v.group = this.oldGroup;

                }

            } else {
                v.editable = false;
            }

        });

        this.dataSource.data = ELEMENT_DATA;
    }

    addGroup() {
        const temp: PeriodicElement = {
            id: ELEMENT_DATA.length,
            group: this.newGroup,
            contacts: 0,
            editable: false,
        };
        if (!!temp.group) {
            ELEMENT_DATA.unshift(temp);
            this.dataSource.data = ELEMENT_DATA;
            // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
            this.newGroup = '';
        }

    }
}
