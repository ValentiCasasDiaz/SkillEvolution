import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';

import { BadgeComponent } from './components/badge/badge.component';

@NgModule({
  declarations: [DashboardComponent, BadgeComponent],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatSelectModule
  ]
})
export class DashboardModule { }
