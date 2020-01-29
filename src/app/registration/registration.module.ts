import { MatTabsModule } from '@angular/material/tabs';
import { SignupComponent } from './signup/signup.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule, MatSnackBarModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';


@NgModule({
  declarations: [
      RegistrationComponent,
      LoginComponent,
      SignupComponent,
      ForgotpasswordComponent,
      VerifyemailComponent,
  ],
  imports: [
    CommonModule,

    RouterModule.forChild([
        {path: '', component: RegistrationComponent, children: [
            {path: 'login', component: LoginComponent},
            {path: 'signup', component: SignupComponent},
        ] },
        {path: 'forgot-password', component: ForgotpasswordComponent},
        {path: 'verify-email-address', component: VerifyemailComponent},
    ]),

    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatSnackBarModule,
  ]
})
export class RegistrationModule { }
