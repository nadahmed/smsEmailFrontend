import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EmailService, OfficialEmailGroupResponse } from 'src/app/api/email/email.service';

export interface PeriodicElement {
    group: string;
    contacts: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { group: 'Engineers', contacts: 2000 },
    { group: 'Doctors', contacts: 6152 },
    { group: 'House wives', contacts: 120 },
    { group: 'Truck drivers', contacts: 150 },
    { group: 'Lawyers', contacts: 1120 },
    { group: 'Salesmen', contacts: 1320 },
    { group: 'Pivate car drivers', contacts: 204 },
    { group: 'BBA Students', contacts: 66 },
    { group: 'BSc Students', contacts: 1203 },
    { group: 'School Students', contacts: 1233 },
];

/**
 * @title Table with filtering
 */

@Component({
    selector: 'app-officialemailgroup',
    templateUrl: './officialemailgroup.component.html',
    styleUrls: ['./officialemailgroup.component.scss']
})
export class OfficialemailgroupComponent implements OnInit {

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    displayedColumns: string[] = ['group', 'contacts'];
    dataSource = new MatTableDataSource();

    constructor(private emailService: EmailService) { }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnInit() {
        const data: { group: string, contacts: number; }[] = [];
        this.emailService.getOfficialGroups()
            .subscribe(
                (res: OfficialEmailGroupResponse) => {
                    console.log(res.data);
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
