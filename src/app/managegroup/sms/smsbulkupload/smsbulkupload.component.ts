import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { GroupAddBody, SmsService } from 'src/app/api/sms/sms.service';

@Component({
  selector: 'app-smsbulkupload',
  templateUrl: './smsbulkupload.component.html',
  styleUrls: ['./smsbulkupload.component.scss']
})
export class SmsbulkuploadComponent implements OnInit {

    columns: any[] = [];
    filename: string;
    rawData: any[] = [];
    nameColumn = new FormControl('', Validators.required);
    numberColumn = new FormControl('', Validators.required);
    groupColumn = new FormControl('', Validators.required);
    columnSelectGroup = new FormGroup(
        {
            nameColumn: this.nameColumn,
            numberColumn: this.numberColumn,
            groupColumn: this.groupColumn,
        },
    );
  constructor(private csvParser: NgxCsvParser, private sms: SmsService) { }

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
                    if (res.toLowerCase() === 'number') {
                        this.numberColumn.setValue(res);
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
                cell: res[this.numberColumn.value]
            });
        });
    }
    this.sms.addOwnContacts(data).subscribe(res => {
        console.log(res);
    },
    err => {
        console.log(err);
    }
    );
  }

}
