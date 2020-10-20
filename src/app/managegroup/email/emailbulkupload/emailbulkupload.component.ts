import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { GroupAddBody, EmailService } from 'src/app/api/email/email.service';

@Component({
  selector: 'app-emailbulkupload',
  templateUrl: './emailbulkupload.component.html',
  styleUrls: ['./emailbulkupload.component.scss']
})
export class EmailbulkuploadComponent implements OnInit {

    columns: any[] = [];
    filename: string;
    rawData: any[] = [];
    nameColumn = new FormControl('', Validators.required);
    emailColumn = new FormControl('', Validators.required);
    groupColumn = new FormControl('', Validators.required);
    columnSelectGroup = new FormGroup(
        {
            nameColumn: this.nameColumn,
            emailColumn: this.emailColumn,
            groupColumn: this.groupColumn,
        },
    );
  constructor(private csvParser: NgxCsvParser, private email: EmailService) { }

  ngOnInit() {
  }

  csvInputChange(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        console.log(target.files.item(0));
        this.filename = target.files.item(0).name;
        const file = target.files.item(0);
        this.csvParser.parse(file, {header: true})
        .subscribe(
            (res: any[]) => {
                this.rawData = res;
                this.columns = Object.keys(res[0]);
            },
            err => {},
            () => {
                this.columns.forEach( (res: string) => {
                    if (res.toLowerCase() === 'name') {
                        this.nameColumn.setValue(res);
                    }
                    if (res.toLowerCase() === 'email') {
                        this.emailColumn.setValue(res);
                    }
                    if (res.toLowerCase() === 'group') {
                        this.groupColumn.setValue(res);
                    }
                });
            }
        );
      }
  }

  startImport() {
    const data: GroupAddBody[] = [];
    if (this.columnSelectGroup.valid) {
        this.rawData.forEach(res => {
            data.push({
                profession: res[this.groupColumn.value],
                name: res[this.nameColumn.value],
                email: res[this.emailColumn.value]
            });
        });
    }
    this.email.addOwnContacts(data).subscribe(res => {
        console.log(res);
    },
    err => {
        console.log(err);
    }
    );
  }

}
