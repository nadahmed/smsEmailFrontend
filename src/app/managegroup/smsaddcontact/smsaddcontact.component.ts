import { SmsService } from 'src/app/api/sms/sms.service';
import { AuthService } from 'src/app/api/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Group {
    value: string;
    viewValue: string;
  }

@Component({
  selector: 'app-smsaddcontact',
  templateUrl: './smsaddcontact.component.html',
  styleUrls: ['./smsaddcontact.component.scss']
})
export class SmsaddcontactComponent implements OnInit {

//     "contacts":[
//         {
//         	"profession":"IT GUY",
//         	"name":"test1",
//         	"email":"testmail1@g.com",
//         	"createdBy":userId
//         }
// /
// {
//         	"profession":"IT GUY",
//         	"name":"test1",
//         	"cell":"0173333333",
//         	"createdBy":userId
//         }
//    ]
// }

    filteredOptions: Observable<string[]>;
    profession = new FormControl('', [Validators.required]);
    name = new FormControl('');
    cell = new FormControl('', [Validators.required, Validators.pattern('^(?:\\+88|01)?(?:\\d{11}|\\d{13})$')]);
    contactsFormGroup = new FormGroup({
        name: this.name,
        profession: this.profession,
        cell: this.cell
    });

    existingGroups = [];

    // groups: Group[] = [
    //     {value: 'engineer', viewValue: 'Engineers'},
    //     {value: 'doctor', viewValue: 'Doctors'},
    //     {value: 'student', viewValue: 'Students'}
    //   ];

    groups: string[];

  constructor(private sms: SmsService, public snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.groups = [];
    this.sms.getCustomerGroups().subscribe( res => {
          if (res.isExecuted) {
              res.data.forEach(val => {
                  this.groups.push(val.professionGroup);
              });
          }
      });

    this.filteredOptions = this.profession.valueChanges
    .pipe(
    startWith(''),
    map(value => this._filter(value))
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.groups.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
      if (this.contactsFormGroup.valid) {
        this.sms.addOwnContacts(this.contactsFormGroup.value).subscribe( (res: {isExecuted: boolean, message: string}) => {
            if (res.isExecuted) {
                this.snackBar.open(`The contact ${this.name.value} is added to the group ${this.profession.value}`, 'Dismiss', {
                    duration: 5000,
                });
            } else {
                this.snackBar.open(res.message, 'Dismiss', { duration: 10000 });
            }
        },
        err => {
            this.snackBar.open(err.message, 'Dismiss', { duration: 10000 });
        }
        );
      }

  }

}
