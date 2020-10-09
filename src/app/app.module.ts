import { ExtrasModule } from './extras/extras.module';
import { TokenInterceptorService } from './_helpers/token-interceptor.service';
import { EmailService } from './api/email/email.service';
import { SmsService } from './api/sms/sms.service';
import { MatSnackBarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './api/auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PopinfoComponent } from './extras/popinfo/popinfo.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ExtrasModule,
  ],
  providers: [
    {
        provide : HTTP_INTERCEPTORS,
        useClass : TokenInterceptorService,
        multi : true,
    },
    AuthService,
    SmsService,
    EmailService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
