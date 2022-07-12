import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BadgeService } from '../services/badge.service';

import { MediaMatcher } from '@angular/cdk/layout';
import { Badge } from '../models/badge.model';
import { BADGES_HARD_SKILLS } from '../global/constants';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  fillerNav = Array.from({ length: 2 }, (_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;


  hardSkillBadges: Badge[] = [];
  user: User;

  userSub: Subscription;
  badgeSub: Subscription;


  constructor(
    private auth: AuthService,
    private badgeService: BadgeService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {

    // Pedimo el usuario al servicio de autentificación
    this.userSub = this.auth.user.subscribe(
      (user) => {
        console.log(`ngOnInit, dashboard: ${user}`);

        this.user = user;

        // Consultamos y dejamos que se actualizen las insignias recien creadas
        this.badgeSub = this.badgeService.getBadges(this.user.uid).subscribe(
          (badgesSnapshot) => {
            let data: any = badgesSnapshot.payload.data();

            if (data) {
              this.hardSkillBadges = [];

              data[BADGES_HARD_SKILLS].forEach(element => {
                this.hardSkillBadges.push(new Badge(element.id, element.img, element.owned));
              });
            }
            else {
              this.badgeService.initializeHardSkillBadges(this.user.uid);
            }
          }
        );
      }
    );

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.userSub.unsubscribe();
    this.badgeSub.unsubscribe();
  }

  logout() {
    this.auth
      .logout()
      .then(() => this.router.navigate(['/']))
      .catch((e) => console.log(e.message));
  }

  updateBadge(value: Badge) {
    const foundIndex = this.hardSkillBadges.findIndex(x => x.id == value.id);
    this.hardSkillBadges[foundIndex] = value;

    const skills = this.badgeService.convertArrayToJSArray(BADGES_HARD_SKILLS, this.hardSkillBadges);
    this.badgeService.createUpdateBadges(this.user.uid, skills);
  }

}
