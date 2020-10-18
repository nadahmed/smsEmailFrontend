import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMatModule } from './../shared-mat/shared-mat.module';
import { RouterModule } from '@angular/router';
import { AccountsettingsComponent } from './accountsettings.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { AvatarComponent } from './avatar/avatar.component';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [
      AccountsettingsComponent,
      UserinfoComponent,
      AvatarComponent,
      ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
        path: '',
        component: AccountsettingsComponent,
        children: [{
                path: '',
                redirectTo: 'userinfo',
                pathMatch: 'full',
            },
            {
                path: 'userinfo',
                component: UserinfoComponent,
            },
            {
                path: 'changepassword',
                component: ChangePasswordComponent,
            }
    ],
    },
]),
FormsModule,
ReactiveFormsModule,
    SharedMatModule,
  ]
})
export class AccountsettingsModule { }
