import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { User } from '../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  userSub: Subscription = null;

  constructor(
    private auth: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(
      (user) => {
        if (!user)
          return;

        this.user = user;

        if (this.auth.canEdit(this.user)) {

        }
        else {
          // Si no puede editar es un alumno, así que le mostramos sus insignias
        }
      }
    );
  }

  getUserPhoto(): string {
    if (this.user && this.user.photoURL) {
      return this.user.photoURL;
    }
    else {
      return "";
    }
  }

  logout(): void {

    this.userSub.unsubscribe();

    this.auth
      .logout()
      .then(() => this.router.navigate(['/login']))
      .catch((e) => console.log(e.message));
  }

  canEdit(): boolean {
    if (this.user) {
      return this.auth.canEdit(this.user);
    }
    else {
      return false;
    }
  }

}
