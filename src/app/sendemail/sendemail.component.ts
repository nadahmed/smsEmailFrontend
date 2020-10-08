import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AuthService } from '../api/auth/auth.service';
import { BulkEmailRequestBody, EmailService } from '../api/email/email.service';
import { Router } from '@angular/router';


export interface InputData  {
    id: number;
    cost: string;
}

@Component({
    selector: 'app-sendemail',
    templateUrl: './sendemail.component.html',
    styleUrls: ['./sendemail.component.scss'],
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
    }]
})
export class SendemailComponent implements OnInit {


    data: InputData[] = [];

    formIndex: FormGroup[] = [];
    formArray = new FormArray([]);

    emailForm = new FormGroup({});
    totalCost: string = '';

    details = {
      group: this.formArray,
      message: this.emailForm,
      cost: this.data,
      totalCost: this.totalCost
  };



    myIndex = 0;

    totalQuantity: number;
    // firstFormGroup: FormGroup;
    // secondFormGroup: FormGroup;

    cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(({ matches }) => {
            if (matches) {
                return [
                    { name: 'total', cols: 8, rows: 2 },
                    { name: 'quantity', cols: 8, rows: 1 },
                    { name: 'amount', cols: 8, rows: 1 },
                ];
            }

            return [
                { name: 'total', cols: 10, rows: 1 },
                { name: 'quantity', cols: 3, rows: 1 },
                { name: 'amount', cols: 3, rows: 1 },
            ];
        })
    );

    constructor(
      private breakpointObserver: BreakpointObserver,
      private emailService: EmailService,
      private router: Router,
      ) {}

    ngOnInit() {
        this.formIndex.push(new FormGroup({}));
    }

    addForm() {
        // if (this.formArray.length < 10 ) {
        //     this.formArray.push(new FormGroup({}));
        // }
        if (this.formIndex.length < 10 ) {
            this.formIndex.push(new FormGroup({}));
        }

    }

    removeForm(index) {

        // this.formArray.removeAt(index);
        // const index = this.formIndex.indexOf(i);
        console.log(index);
        if (index > -1) {
            this.formIndex.splice(index, 1);
        }

        if (this.formIndex.length <= 0 ) {
            this.addForm();
        }

    }

    myEvents(i, value) {

        // console.log('[CHANGED]', i, value);
        this.updateTotals(i, value);

    }

    private updateTotals(i, value) {

        this.data[i] = {id: i, cost: value.cost};
        let cost = 0.00;
        this.data.forEach( (val) => {
            cost = cost + parseFloat(val.cost);
            // console.log(val.cost);
        });
        this.totalCost = cost.toFixed(2);

        let quan = 0;
        this.formArray.controls.forEach(val => {
            if (val.valid) {
                // console.log(val.value.quantity);
                quan = quan + val.value.quantity;
            }
        });

        this.totalQuantity = quan;
    }

    deletedEvent(i, value) {
        // console.log('[DELETED]', i, value);
        this.formArray.removeAt(i);
        this.updateTotals(i, {cost: '0.00'});
        this.data.splice(i, 1);

    }

    createdEvent(i, value) {
            // console.log('[CREATED]', i, value);
            this.formArray.push(value.group);
            this.data.push(value.cost);
            this.updateTotals(i, {cost: '0.00'});

            // this.formArray.setControl(i, value.group);
            // this.formArray.insert(value.index, value.group);
    }

    messageEvents(form) {
        this.emailForm = form;
    }

    formComplete() {
        this.details = {
            group: this.formArray,
            cost: this.data,
            totalCost: this.totalCost,
            message: this.emailForm,
        };
    }

    sendToAll(){
      const data: BulkEmailRequestBody = {
        groups:[],
        ...this.emailForm.value
      }


      for(let formgroup of this.formArray.controls){
        data.groups.push({
          type: formgroup.value.groupName.type.toLowerCase(),
          category:formgroup.value.groupName.groupName,
          qty: formgroup.value.quantity,
        });
      }
      console.log(data);
      this.emailService.sendBulkSMS(data).subscribe(res => {
        console.log(res);
      })
    }
}
