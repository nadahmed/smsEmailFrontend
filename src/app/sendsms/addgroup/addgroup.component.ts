import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

export interface CustomerGroup {
    groupName: string;
    available: number;
}

/**
 * @title Basic select
 */
@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.component.html',
  styleUrls: ['./addgroup.component.scss']
})
export class AddgroupComponent implements OnDestroy {

    @Output() formEvents = new EventEmitter<FormGroup>();
    myGroup: FormGroup;

    selectedGroup: CustomerGroup = {groupName: '', available: 0};

    customerGroups: CustomerGroup[] = [
        {groupName: 'Engineers', available: 12000},
        {groupName: 'Doctors', available: 11234},
        {groupName: 'Students', available: 1223}
      ];


      cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(({ matches }) => {
            if (matches) {
                return [
                    { name: 'group', cols: 16, rows: 1 },
                    { name: 'available', cols: 8, rows: 1 },
                    { name: 'quantity', cols: 8, rows: 1 },
                    { name: 'amount', cols: 16, rows: 1 },
                ];
            }

            return [
                { name: 'group', cols: 7, rows: 1 },
                { name: 'available', cols: 3, rows: 1 },
                { name: 'quantity', cols: 2, rows: 1 },
                { name: 'amount', cols: 4, rows: 1 },
            ];
        })
    );

    myGroupSubscription: Subscription;
    cost = '0.00';

    constructor(private breakpointObserver: BreakpointObserver) {
        this.myGroup = new FormGroup({
            groupName : new FormControl('', [Validators.required]),
            quantity : new FormControl({value: '', disabled: true }, [Validators.min(50), Validators.pattern('^[0-9]*$'), Validators.required])
        });

        this.myGroupSubscription = this.myGroup.valueChanges.subscribe(
            (value) => {
                // console.log(value);
                if (!!value.groupName) {
                    this.myGroup.get(['quantity']).enable({onlySelf: true, emitEvent: true});
                } else {
                    // this.myGroup.disable();
                }
                if (value.quantity > this.selectedGroup.available) {
                    this.myGroup.patchValue({quantity: this.selectedGroup.available});
                }

                if ( this.myGroup.get(['groupName']).valid && this.myGroup.get(['quantity']).valid) {
                    this.cost = (this.myGroup.value.quantity * 0.25).toFixed(2);
                } else {
                    this.cost = (0).toFixed(2);
                }

                
                // console.log(this.selectedGroup);
            });
     }

     ngOnDestroy() {
         this.myGroupSubscription.unsubscribe();
         delete this.formEvents;
     }
}