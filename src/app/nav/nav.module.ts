import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlnavComponent } from './controlnav/controlnav.component';
import { TopnavComponent } from './topnav/topnav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from '../app-routing.module';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [
      ControlnavComponent,
      TopnavComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    FlexLayoutModule,
  ],
  exports: [
      ControlnavComponent,
      TopnavComponent
  ]
})
export class NavModule { }
