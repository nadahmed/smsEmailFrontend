import { FormGroup, FormControl } from '@angular/forms';
import {Component, Input} from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

export interface Food {
  value: string;
  viewValue: string;
}

/**
 * @title Basic select
 */
@Component({
  selector: 'app-addgroup',
  templateUrl: './addgroup.component.html',
  styleUrls: ['./addgroup.component.scss']
})
export class AddgroupComponent {

    myGroup: FormGroup;

    foods: Food[] = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
      ];


      cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(({ matches }) => {
            if (matches) {
                return [
                    { name: 'group', cols: 8, rows: 1 },
                    { name: 'available', cols: 8, rows: 1 },
                    { name: 'quantity', cols: 8, rows: 1 },
                    { name: 'amount', cols: 8, rows: 1 },
                ];
            }

            return [
                { name: 'group', cols: 7, rows: 1 },
                { name: 'available', cols: 3, rows: 1 },
                { name: 'quantity', cols: 3, rows: 1 },
                { name: 'amount', cols: 3, rows: 1 },
            ];
        })
    );

    constructor(private breakpointObserver: BreakpointObserver) {
        this.myGroup = new FormGroup({
            groupName : new FormControl()
        });
     }
}
