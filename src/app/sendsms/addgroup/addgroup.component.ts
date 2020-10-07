import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SmsService } from 'src/app/api/sms/sms.service';

export interface CustomerGroup {
    name: string;
    categories: {
        groupName: string;
        available: number;
    }[];
};

/**
 * @title Basic select
 */
@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.component.html',
  styleUrls: ['./addgroup.component.scss']
})
export class AddgroupComponent implements OnDestroy, OnInit {

    @Output() formEvents = new EventEmitter<any>();

    @Output() init = new EventEmitter<any>();

    @Output() del = new EventEmitter<any>();

    myGroup: FormGroup;

    // selectedGroup = {
    //     available: null,
    //     groupName: '',
    // };

    selectedGroup = {
          available: null,
          groupName: '',
          type: ''
      };

    groupName = new FormControl('', [Validators.required]);
    quantity = new FormControl(
        {
            value: null,
            disabled: true,
        },
        [
            Validators.min(1),
            Validators.pattern('^[0-9]*$'),
            Validators.required,
        ]);

        customerGroups: CustomerGroup[] = [];
    // customerGroups: CustomerGroup[] = [
        // {groupName: 'Engineers', available: 12000},
        // {groupName: 'Doctors', available: 11234},
        // {groupName: 'Students', available: 1223}
    //   ];


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

    constructor(
        private breakpointObserver: BreakpointObserver,
        private sms: SmsService,
        ) {
        this.myGroup = new FormGroup({
            groupName: this.groupName,
            quantity: this.quantity,
        });
        // this.myGroup.addControl('groupName', this.groupName);
        // this.myGroup.addControl('quantity', this.quantity);
        // console.log(this.myGroup.controls);

        this.myGroupSubscription = this.myGroup.valueChanges.subscribe(
            (value) => {
                if (!!value.groupName) {
                    this.quantity.enable({onlySelf: false, emitEvent: false});
                } else {
                    // this.myGroup.disable();
                }
                if (value.quantity > this.selectedGroup.available) {
                    this.myGroup.patchValue({quantity: this.selectedGroup.available});
                }

                // if (value.quantity > this.selectedGroup[0].categories[0].available) {
                //     this.myGroup.patchValue({quantity: this.selectedGroup[0].categories[0].groupName});
                // }

                if ( this.myGroup.valid) {
                    this.cost = (this.myGroup.value.quantity * 0.25).toFixed(2);
                } else {
                    this.cost = (0).toFixed(2);
                }

                this.formEvents.emit({group: this.myGroup, cost: this.cost});
                // console.log(this.selectedGroup);
            });
     }

     ngOnInit() {
         this.customerGroups = [
             {
                 name: 'Official',
                 categories: []
            },
            {
                name: 'Own',
                categories: []
           }
         ]
        this.sms.getSmsCategory().subscribe( res => {
            if(res.isExecuted) {
                res.data.official.forEach(val => {
                    this.customerGroups.forEach(group => {
                        if (group.name === 'Official'){
                            group.categories.push(
                                {
                                    groupName: val.category,
                                    available: val.count
                                }
                            );
                        }
                    });
                });
                res.data.own.forEach(val => {
                    this.customerGroups.forEach(group => {
                        if (group.name === 'Own'){
                            group.categories.push(
                                {
                                    groupName: val.category,
                                    available: val.count
                                }
                            );
                        }
                    });
                });
            }
        });
        this.init.emit({group: this.myGroup, cost: this.cost});
     }

     ngOnDestroy() {
        this.del.emit({group: this.myGroup, cost: this.cost});

        this.myGroupSubscription.unsubscribe();
        delete this.formEvents;
     }
}
