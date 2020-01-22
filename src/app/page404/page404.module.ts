import { RouterModule } from '@angular/router';
import { Page404Component } from './page404.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
      Page404Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {path: '', component: Page404Component},
    ])
  ]
})
export class Page404Module { }
