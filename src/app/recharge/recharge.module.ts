import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RechargeComponent } from './recharge.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [RechargeComponent],
  imports: [
    CommonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatToolbarModule,
    FormsModule,

    RouterModule.forChild([{path:'', component: RechargeComponent}]),
  ]
})
export class RechargeModule { }
