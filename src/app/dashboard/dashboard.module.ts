import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BadgesPageComponent } from './pages/badges-page/badges-page.component';
import { BadgeComponent } from './components/badge/badge.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [DashboardComponent, BadgeComponent, BadgesPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatSelectModule,
    MatMenuModule,
    MatCardModule
  ]
})
export class DashboardModule { }
