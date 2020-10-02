import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedinLayoutComponent } from './loggedin-layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ControlnavComponent } from '../controlnav/controlnav.component';



@NgModule({
  declarations: [
      LoggedinLayoutComponent,
      ControlnavComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatMenuModule,
    FlexLayoutModule,

    RouterModule.forChild([
        {path: '', component: LoggedinLayoutComponent, children: [
            {path: 'sendsms', loadChildren: () => import('../sendsms/sendsms.module').then(m => m.SendsmsModule)},
            {path: 'sendemail', loadChildren: () => import('../sendemail/sendemail.module').then(m => m.SendemailModule)},
            {path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)},
            {path: 'managegroups', loadChildren: () => import('../managegroup/managegroup.module').then(m => m.ManagegroupModule) },
            {path: 'transaction', loadChildren: () => import('../transaction/transaction.module').then(m => m.TransactionModule) },
        ]},

    ]),

  ]
})
export class LoggedinLayoutModule {
 }
