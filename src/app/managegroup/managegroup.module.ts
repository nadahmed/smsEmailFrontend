import { SharedMatModule } from './../shared-mat/shared-mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagegroupRoutingModule } from './managegroup-routing.module';
import { ManagegroupComponent } from './managegroup.component';
import { AvailablegroupsComponent } from '../availablegroups/availablegroups.component';
import { CustomeremailgroupComponent } from '../availablegroups/customeremailgroup/customeremailgroup.component';
import { OfficialsmsgroupComponent } from '../availablegroups/officialsmsgroup/officialsmsgroup.component';
import { OfficialemailgroupComponent } from '../availablegroups/officialemailgroup/officialemailgroup.component';
import { CustomersmsgroupComponent } from '../availablegroups/customersmsgroup/customersmsgroup.component';
import { NgxCsvParserModule } from 'ngx-csv-parser';

import { SmsaddcontactComponent } from './sms/smsaddcontact/smsaddcontact.component';
import { SmsbulkuploadComponent } from './sms/smsbulkupload/smsbulkupload.component';
import { SmseditcontactComponent } from './sms/smseditcontact/smseditcontact.component';
import { SmseditgroupComponent } from './sms/smseditgroup/smseditgroup.component';
import { EmailaddcontactComponent } from './email/emailaddcontact/emailaddcontact.component';
import { EmailbulkuploadComponent } from './email/emailbulkupload/emailbulkupload.component';
import { EmaileditcontactComponent } from './email/emaileditcontact/emaileditcontact.component';

@NgModule({
    declarations: [
        ManagegroupComponent,
        AvailablegroupsComponent,
        SmseditgroupComponent,
        OfficialsmsgroupComponent,
        OfficialemailgroupComponent,
        CustomersmsgroupComponent,
        CustomeremailgroupComponent,
        SmsaddcontactComponent,
        SmsbulkuploadComponent,
        SmseditcontactComponent,
        EmailaddcontactComponent,
        EmailbulkuploadComponent,
        EmaileditcontactComponent,
    ],
    imports: [
        CommonModule,
        ManagegroupRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxCsvParserModule,
        SharedMatModule,

    ],
    exports: [CommonModule]
})
export class ManagegroupModule { }
