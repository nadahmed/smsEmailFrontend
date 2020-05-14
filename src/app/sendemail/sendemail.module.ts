import { DoneComponent } from './done/done.component';
import { SendemailComponent } from './sendemail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { EmailComponent } from './email/email.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
// tslint:disable-next-line: max-line-length
import { MatInputModule, MatSelectModule, MatAutocompleteModule, MatBadgeModule, MatTooltipModule, MatChipsModule } from '@angular/material';
import { AddgroupComponent } from './addgroup/addgroup.component';

import { CKEditorModule } from 'ng2-ckeditor';


@NgModule({
  declarations: [
      SendemailComponent,
      EmailComponent,
      AddgroupComponent,
      DoneComponent,
  ],
  imports: [
    CommonModule,
    CKEditorModule,
    RouterModule.forChild([
        {path: '', component: SendemailComponent},
    ]),
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatBadgeModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    MatChipsModule,
  ]
})
export class SendemailModule { }
