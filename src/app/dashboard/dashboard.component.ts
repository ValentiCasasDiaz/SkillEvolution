import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BadgeService } from '../services/badge.service';

import { MediaMatcher } from '@angular/cdk/layout';
import { Badge } from '../models/badge.model';

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
    this.badgeService.getBadges(this.authService.user._id).subscribe(
      (badgesSnapshot) => {
        let data: any = badgesSnapshot.payload.data();

        if (data) {
          this.hardSkillBadges = [];

          data['hardSkills'].forEach(element => {
            this.hardSkillBadges.push(new Badge(element.id, element.img, element.owned));
          });
        }
        else {
          this.badgeService.initializeHardSkillBadges(this.authService.user._id);
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
    console.log(value);

  }

}
