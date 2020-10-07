import { AvailablegroupsComponent } from './../availablegroups/availablegroups.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagegroupComponent } from './managegroup.component';

import { SmseditcontactComponent } from './sms/smseditcontact/smseditcontact.component';
import { SmsaddcontactComponent } from './sms/smsaddcontact/smsaddcontact.component';
import { SmseditgroupComponent } from './sms/smseditgroup/smseditgroup.component';
import { EmailaddcontactComponent } from './email/emailaddcontact/emailaddcontact.component';

const routes: Routes = [
    {
        path: '', component: ManagegroupComponent,
        children: [
            { path: '', component: AvailablegroupsComponent },
            { path: 'sms/editgroup', component: SmseditgroupComponent },
            { path: 'sms/contactlist', component: SmseditcontactComponent },
            { path: 'sms/import', component: SmsaddcontactComponent },
            { path: 'email/import', component: EmailaddcontactComponent },
        ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagegroupRoutingModule { }
