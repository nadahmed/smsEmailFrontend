import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendsmsComponent } from './sendsms.component';
import { RouterModule } from '@angular/router';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatAutocompleteModule, MatBadgeModule, MatTooltipModule } from '@angular/material';
import { AddgroupComponent } from './addgroup/addgroup.component';

@NgModule({
  declarations: [
      SendsmsComponent,
      AddgroupComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {path: '', component: SendsmsComponent},
    ]),
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatBadgeModule,
    MatIconModule,
    MatTooltipModule,
  ]
})
export class SendsmsModule { }
