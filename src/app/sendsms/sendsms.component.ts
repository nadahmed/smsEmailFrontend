import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';


export interface InputData  {
    id: number;
    cost: string;
}

@Component({
    selector: 'app-sendsms',
    templateUrl: './sendsms.component.html',
    styleUrls: ['./sendsms.component.scss'],
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
    }]
})
export class SendsmsComponent implements OnInit {


    data: InputData[];

    formIndex: FormGroup[];


    formArray: FormArray;

    myIndex: number;

    totalCost: string;
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

    constructor(private breakpointObserver: BreakpointObserver) {
        this.formArray = new FormArray([]);
        this.formIndex = [];
        this.data = [];
        this.myIndex = 0;
     }

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
        this.data.splice(i, 1);
    }

    createdEvent(i, value) {
            // console.log('[CREATED]', i, value);
            this.formArray.push(value.group);
            this.data.push(value.cost);
            // this.formArray.setControl(i, value.group);
            // this.formArray.insert(value.index, value.group);
    }
}
