import { ExtrasModule } from './../extras/extras.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { ChartsComponent } from './charts/charts.component';
import { RecentTranxComponent } from './recent-tranx/recent-tranx.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { PopinfoComponent } from '../extras/popinfo/popinfo.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ChartsComponent,
    RecentTranxComponent,
  ],
  imports: [
    CommonModule,

    RouterModule.forChild(
        [
            { path: '', component: DashboardComponent},
        ]
        ),

    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    LayoutModule,
    ChartsModule,
  ],
  providers: [
      ThemeService
  ],
})
export class DashboardModule { }
