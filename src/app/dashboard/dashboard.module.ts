import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BadgesPageComponent } from './pages/badges-page/badges-page.component';
import { BadgeComponent } from './components/badge/badge.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { MatSelectModule } from '@angular/material/select';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';



@NgModule({
  declarations: [DashboardComponent, BadgeComponent, BadgesPageComponent, MenuPageComponent, UsersPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,

    MatToolbarModule,
    MatMenuModule,

    MatCardModule,
    MatButtonModule,

    MatSelectModule,
  ]
})
export class DashboardModule { }
