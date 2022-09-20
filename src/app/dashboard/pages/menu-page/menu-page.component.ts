import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from 'src/app/models/user.model';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit, OnDestroy {

  user: User;
  canEdit: boolean = false;
  userSub: Subscription = null;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userSub = this.auth.user.subscribe(
      (user) => {
        if (!user)
          return;

        this.user = user;
        this.canEdit = this.auth.canEdit(this.user);
      }
    );
  }

  goToUrl(url: string) {
    this.router.navigate([url]);
  }

}
