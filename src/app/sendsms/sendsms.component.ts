import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-sendsms',
    templateUrl: './sendsms.component.html',
    styleUrls: ['./sendsms.component.scss'],
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
    }]
})
export class SendsmsComponent implements OnInit {

    formGroups: FormGroup[] = [];
    // firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

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

    constructor(private formBuilder: FormBuilder, private breakpointObserver: BreakpointObserver) { }

    ngOnInit() {

        // tslint:disable-next-line: prefer-const
        let formGroup = this.formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
        this.formGroups.push(formGroup);
        this.secondFormGroup = this.formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
    }

    addForm() {
        if (this.formGroups.length < 10 ) {
            const form = this.formBuilder.group({
                secondCtrl: ['', Validators.required]
            });

            this.formGroups.push(form);
        }

    }

    removeForm(form: FormGroup) {
        const index = this.formGroups.indexOf(form);
        if (index > -1) {
            this.formGroups.splice(index, 1);
        }

        if (this.formGroups.length <= 0 ) {
            this.addForm();
        }
    }
}
