import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { BadgesPageComponent } from './pages/badges-page/badges-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'menu', pathMatch: 'full' },
      { path: 'menu', component: MenuPageComponent },
      { path: 'badges', component: BadgesPageComponent },
      { path: 'users', component: UsersPageComponent }, // TODO: Bloquear URL con Guard de Admin / Profe
    ]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
