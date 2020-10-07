import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagegroupRoutingModule } from './managegroup-routing.module';
import { ManagegroupComponent } from './managegroup.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AvailablegroupsComponent } from '../availablegroups/availablegroups.component';
import { CustomeremailgroupComponent } from '../availablegroups/customeremailgroup/customeremailgroup.component';
import { OfficialsmsgroupComponent } from '../availablegroups/officialsmsgroup/officialsmsgroup.component';
import { OfficialemailgroupComponent } from '../availablegroups/officialemailgroup/officialemailgroup.component';
import { CustomersmsgroupComponent } from '../availablegroups/customersmsgroup/customersmsgroup.component';
import { MatButtonModule, MatPaginatorModule, MatTooltipModule, MatSelectModule, MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { MatFileUploadModule } from 'angular-material-fileupload';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxCsvParserModule } from 'ngx-csv-parser';

import { SmsaddcontactComponent } from './sms/smsaddcontact/smsaddcontact.component';
import { SmsbulkuploadComponent } from './sms/smsbulkupload/smsbulkupload.component';
import { SmseditcontactComponent } from './sms/smseditcontact/smseditcontact.component';
import { SmseditgroupComponent } from './sms/smseditgroup/smseditgroup.component';

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
    ],
    imports: [
        CommonModule,
        ManagegroupRoutingModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatGridListModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatTooltipModule,
        MatSelectModule,
        MatFileUploadModule,
        MatCardModule,
        MatSnackBarModule,
        MatAutocompleteModule,
        NgxCsvParserModule,
        MatProgressSpinnerModule,

    ],
    exports: [CommonModule]
})
export class ManagegroupModule { }
