import { NavModule } from './nav/nav.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Page404Module } from './page404/page404.module';
import { DashboardModule } from './dashboard/dashboard.module';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    Page404Module,
    DashboardModule,
    NavModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
