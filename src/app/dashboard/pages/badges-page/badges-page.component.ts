import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { BadgeService } from '../../../services/badge.service';

import { Badge } from '../../../models/badge.model';
import { BADGES_HARD_SKILLS } from '../../../global/constants';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-badges-page',
  templateUrl: './badges-page.component.html',
  styleUrls: ['./badges-page.component.css']
})
export class BadgesPageComponent implements OnInit {

  hardSkillBadges: Badge[] = [];
  user: User;

  // User Selector Fields
  selectedUser: User = null;
  users: User[] = [];

  userSub: Subscription = null;
  badgeSub: Subscription = null;
  allUsersSub: Subscription = null;

  constructor(
    private auth: AuthService,
    private badgeService: BadgeService,
    private router: Router) {}

  ngOnInit(): void {
    // Pedimos el usuario al servicio de autentificación
    this.userSub = this.auth.user.subscribe(
      (user) => {
        if (!user)
          return;

        this.user = user;

        if (this.auth.canEdit(this.user)) {
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
        else {
          // Si no puede editar es un alumno, así que le mostramos sus insignias
          this.getUserBadges(this.user);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.badgeSub.unsubscribe();
    this.allUsersSub.unsubscribe();
  }

  getUserBadges(user: User): void {
    // Consultamos y dejamos que se actualizen las insignias recien creadas
    this.badgeSub = this.badgeService.getBadges(user.uid).subscribe(
      (badgesSnapshot) => {
        let data: any = badgesSnapshot.payload.data();

        if (data) {
          this.hardSkillBadges = [];

          data[BADGES_HARD_SKILLS].forEach(element => {
            this.hardSkillBadges.push(new Badge(element.id, element.img, element.owned));
          });
        }
        else {
          this.badgeService.initializeHardSkillBadges(user.uid);
        }
      }
    );
  }

  updateBadge(value: Badge): void {
    const foundIndex = this.hardSkillBadges.findIndex(x => x.id == value.id);
    this.hardSkillBadges[foundIndex] = value;

    const skills = this.badgeService.convertArrayToJSArray(BADGES_HARD_SKILLS, this.hardSkillBadges);

    if (this.canEdit() && this.selectedUser){
      this.badgeService.createUpdateBadges(this.selectedUser.uid, skills);
    }
  }

  canEdit(): boolean {
    if (this.user) {
      return this.auth.canEdit(this.user);
    }
    else {
      return false;
    }
  }

  onUserChange(user: User) {
    if (this.badgeSub) {
      this.badgeSub.unsubscribe();
    }

    this.getUserBadges(user);
  }

}
