import { SendingService } from './api/sending.service';
import { MatToolbarModule } from '@angular/material/toolbar';
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
    MatToolbarModule,
  ],
  providers: [
    {
        provide : HTTP_INTERCEPTORS,
        useClass : TokenInterceptorService,
        multi : true,
    },
    AuthService,
    SmsService,
    EmailService,
    SendingService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
