import { SmseditcontactComponent } from './smseditcontact/smseditcontact.component';
import { SmsaddcontactComponent } from './smsaddcontact/smsaddcontact.component';
import { SmseditgroupComponent } from './smseditgroup/smseditgroup.component';
import { AvailablegroupsComponent } from './../availablegroups/availablegroups.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagegroupComponent } from './managegroup.component';

const routes: Routes = [
    {
        path: '', component: ManagegroupComponent,
        children: [
            { path: '', component: AvailablegroupsComponent },
            { path: 'sms/editgroup', component: SmseditgroupComponent },
            { path: 'sms/contactlist', component: SmseditcontactComponent },
            { path: 'sms/import', component: SmsaddcontactComponent },
        ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagegroupRoutingModule { }
