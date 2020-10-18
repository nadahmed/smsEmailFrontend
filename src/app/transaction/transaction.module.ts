import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from './transaction.component';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
    declarations: [TransactionComponent],
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatToolbarModule,
        RouterModule.forChild([
            { path: '', component: TransactionComponent }
        ])
    ],
})
export class TransactionModule { }
