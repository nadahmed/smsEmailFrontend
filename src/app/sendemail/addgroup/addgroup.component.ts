import { Carrier, SendingService } from './../../api/sending.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { EmailService } from 'src/app/api/email/email.service';
import { AuthService } from 'src/app/api/auth/auth.service';
import { CategoryData } from 'src/app/api/api-service.interface';

export interface CustomerGroup {
  name: string;
  categories: {
    groupName: string;
    available: number;
  }[];
}

/**
 * @title Basic select
 */
@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.component.html',
  styleUrls: ['./addgroup.component.scss'],
})
export class AddgroupComponent implements OnDestroy, OnInit {
  @Output() formEvents = new EventEmitter<any>();

  @Output() init = new EventEmitter<any>();

  @Output() del = new EventEmitter<any>();

  selectedGroup = {
    available: null,
    groupName: '',
    type: '',
  };

  groupName = new FormControl('', [Validators.required]);
  quantity = new FormControl(
    {
      value: null,
      disabled: true,
    },
    [Validators.min(1), Validators.pattern('^[0-9]*$'), Validators.required]
  );

  myGroup = new FormGroup({
    groupName: this.groupName,
    quantity: this.quantity,
  });

  customerGroups: CustomerGroup[] = [];

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
    private email: SendingService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.email.carrier = Carrier.Email;
    this.myGroupSubscription = this.myGroup.valueChanges.subscribe((value) => {
      // console.log(value);
      if (!!value.groupName) {
        this.quantity.enable({ onlySelf: false, emitEvent: false });
      } else {
        // this.myGroup.disable();
      }
      if (value.quantity > this.selectedGroup.available) {
        this.myGroup.patchValue({ quantity: this.selectedGroup.available });
      }

      if (this.myGroup.valid) {
        this.cost = (
          this.myGroup.value.quantity * Number(this.auth.user.emailUnitCost)
        ).toFixed(2);
      } else {
        this.cost = (0).toFixed(2);
      }

      this.formEvents.emit({ group: this.myGroup, cost: this.cost });
      // console.log(this.selectedGroup);
    });
    this.customerGroups = [
      {
        name: 'Official',
        categories: [],
      },
      {
        name: 'Own',
        categories: [],
      },
    ];
    this.email.getCategory().subscribe((res) => {
      if (res.isExecuted) {
        const data = (res.data as CategoryData);
        if ( !data.official) { return; }
        data.official.forEach((val) => {
          this.customerGroups.forEach((group) => {
            if (group.name === 'Official') {
              group.categories.push({
                groupName: val.category,
                available: val.count,
              });
            }
          });
        });
        data.own.forEach((val) => {
          this.customerGroups.forEach((group) => {
            if (group.name === 'Own') {
              group.categories.push({
                groupName: val.category,
                available: val.count,
              });
            }
          });
        });
      }
    });

    this.init.emit({ group: this.myGroup, cost: this.cost });
  }

  ngOnDestroy() {
    this.del.emit({ group: this.myGroup, cost: this.cost });

    this.myGroupSubscription.unsubscribe();
    delete this.formEvents;
  }
}
