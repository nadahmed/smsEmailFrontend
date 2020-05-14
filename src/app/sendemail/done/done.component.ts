import { Component, OnInit, Input, OnChanges } from '@angular/core';

// export interface Transaction {
//     item: string;
//     cost: number;
//   }

export interface Group {
    groupName: string;
    available: number;
}

export interface Cost {
    id: number;
    cost: string;
}

export interface Transaction {
    groupName: Group;
    quantity: number;
    cost: string;
  }

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit, OnChanges {

    @Input() details;

    cost: Cost[];

    displayedColumns: string[] = ['group', 'quantity', 'cost'];
    // transactions: Transaction[] = [
    //   {item: 'Beach ball', cost: 4},
    //   {item: 'Towel', cost: 5},
    //   {item: 'Frisbee', cost: 2},
    //   {item: 'Sunscreen', cost: 4},
    //   {item: 'Cooler', cost: 25},
    //   {item: 'Swim suit', cost: 15},
    // ];


    transactions: Transaction[] = [];

    /** Gets the total cost of all transactions. */

    getTotalQuantity() {
        return this.transactions.map(t => t.quantity).reduce((acc, value) => acc + value, 0);
      }

    getTotalCost() {
      return this.details.totalCost;
    }

  ngOnInit() {
      
    //   console.log(this.details);
  }

  ngOnChanges() {
    this.transactions = this.details.group.value;
    this.transactions.map((t, i, arr) => {
        arr[i] = {
            groupName: t.groupName,
            quantity: t.quantity,
            cost : this.details.cost[i].cost,
        };
    });
    // this.transactions = this.details.group.value;
    // this.cost = this.details.cost;
    // console.log(this.details);
  }

}
