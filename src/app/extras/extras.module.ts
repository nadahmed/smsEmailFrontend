import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopinfoComponent } from './popinfo/popinfo.component';
import { MatDialogModule, MatGridListModule, MatProgressSpinnerModule } from '@angular/material';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  declarations: [
      PopinfoComponent,
      LoaderComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    MatDialogModule,
  ],
  entryComponents: [
      PopinfoComponent,
      LoaderComponent,
  ]
})
export class ExtrasModule { }
