import { EmailService } from 'src/app/api/email/email.service';
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
  selector: 'app-emailaddcontact',
  templateUrl: './emailaddcontact.component.html',
  styleUrls: ['./emailaddcontact.component.scss']
})
export class EmailaddcontactComponent implements OnInit {


    filteredOptions: Observable<string[]>;
    profession = new FormControl('', [Validators.required]);
    name = new FormControl('');
    email = new FormControl('', [Validators.required, Validators.email]);
    contactsFormGroup = new FormGroup({
        name: this.name,
        profession: this.profession,
        email: this.email
    });

    existingGroups = [];

    // groups: Group[] = [
    //     {value: 'engineer', viewValue: 'Engineers'},
    //     {value: 'doctor', viewValue: 'Doctors'},
    //     {value: 'student', viewValue: 'Students'}
    //   ];

    groups: string[];

  constructor(private emailService: EmailService, public snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.groups = [];
    this.emailService.getCustomerGroups().subscribe( res => {
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
        this.emailService.addOwnContact(this.contactsFormGroup.value).subscribe( (res: {isExecuted: boolean, message: string}) => {
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
