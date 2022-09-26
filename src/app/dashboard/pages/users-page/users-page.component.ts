import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { User } from 'src/app/models/user.model';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit, OnDestroy {

  users: User[] = [];

  allUsersSub: Subscription = null;

  constructor(
    private auth: AuthService) { }

  ngOnInit(): void {
    this.allUsersSub = this.auth.getUsers().subscribe(
      (usersSnapshot) => {
        let data: any = usersSnapshot;

        if (data) {
          this.users = [];

          data.forEach(element => {
            const userData: User = element.payload.doc.data();

            // Filtrem per veure només els alumnes. Ni administrador ni professors es veuran.
            if (userData.role == 0) {
              this.users.push(userData);
            }
          });

          this.users.sort((a: User, b: User) => {
            return (a.displayName < b.displayName ? -1 : 1);
          });
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.allUsersSub.unsubscribe();
  }

  getImage(url: string): string {
    return "assets/images/profile-user.png";
  }

}
