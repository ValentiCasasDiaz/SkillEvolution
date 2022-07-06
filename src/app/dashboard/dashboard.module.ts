import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule  } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BadgeComponent } from './components/badge/badge.component';




@NgModule({
  declarations: [DashboardComponent, BadgeComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ]
})
export class DashboardModule { }
