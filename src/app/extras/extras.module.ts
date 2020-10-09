import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopinfoComponent } from './popinfo/popinfo.component';
import { MatDialogModule, MatGridListModule } from '@angular/material';



@NgModule({
  declarations: [
      PopinfoComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
  ],
  exports: [
    MatDialogModule,
  ],
  entryComponents: [
      PopinfoComponent,
  ]
})
export class ExtrasModule { }
