import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  filteredUsers: User[] = [];

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

          this.filteredUsers = this.users;
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

  filterUsers(event): void {

    this.filteredUsers = this.users.filter((value: User) => {
      const filterValue: string = (event.target.value).toLowerCase();
      const name = value.displayName.toLowerCase();
      const email = value.email.toLowerCase();

      return (name.includes(filterValue) || email.includes(filterValue));
    });

  }

}
