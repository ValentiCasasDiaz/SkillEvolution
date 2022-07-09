import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BadgeService } from '../services/badge.service';

import { MediaMatcher } from '@angular/cdk/layout';
import { Badge } from '../models/badge.model';
import { BADGES_HARD_SKILLS } from '../global/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;

  hardSkillBadges: Badge[] = [];



  fillerNav = Array.from({ length: 2 }, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(
    private authService: AuthService,
    private badgeService: BadgeService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {

    // Consultamos y dejamos que se actualizen las insignias recien creadas
    this.badgeService.getBadges(this.authService.getUserID()).subscribe(
      (badgesSnapshot) => {
        let data: any = badgesSnapshot.payload.data();

        if (data) {
          this.hardSkillBadges = [];

          data[BADGES_HARD_SKILLS].forEach(element => {
            this.hardSkillBadges.push(new Badge(element.id, element.img, element.owned));
          });
        }
        else {
          this.badgeService.initializeHardSkillBadges(this.authService.getUserID());
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/']))
      .catch((e) => console.log(e.message));
  }

  updateBadge(value: Badge) {
    const foundIndex = this.hardSkillBadges.findIndex(x => x.id == value.id);
    this.hardSkillBadges[foundIndex] = value;

    const skills = this.badgeService.convertArrayToJSArray(BADGES_HARD_SKILLS, this.hardSkillBadges);
    this.badgeService.createUpdateBadges(this.authService.getUserID(), skills);
  }

}
