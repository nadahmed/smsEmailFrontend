import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagegroupRoutingModule } from './managegroup-routing.module';
import { ManagegroupComponent } from './managegroup.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AvailablegroupsComponent } from '../availablegroups/availablegroups.component';
import { SmseditgroupComponent } from '../smseditgroup/smseditgroup.component';
import { CustomeremailgroupComponent } from '../availablegroups/customeremailgroup/customeremailgroup.component';
import { OfficialsmsgroupComponent } from '../availablegroups/officialsmsgroup/officialsmsgroup.component';
import { OfficialemailgroupComponent } from '../availablegroups/officialemailgroup/officialemailgroup.component';
import { CustomersmsgroupComponent } from '../availablegroups/customersmsgroup/customersmsgroup.component';
import { MatPaginatorModule } from '@angular/material';

@NgModule({
    declarations: [
        ManagegroupComponent,
        AvailablegroupsComponent,
        SmseditgroupComponent,
        OfficialsmsgroupComponent,
        OfficialemailgroupComponent,
        CustomersmsgroupComponent,
        CustomeremailgroupComponent,
    ],
    imports: [
        // BrowserModule,
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
    ],
    exports: [CommonModule]
})
export class ManagegroupModule { }
