import { ChangeDetectorRef, Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;

  badgesUrl: string = 'assets/images/badges/';
  dartBadges = Array.from({length: 5}, (_, i) => `${this.badgesUrl}Dart ${i + 1}.png`);
  flutterBadges = Array.from({length: 5}, (_, i) => `${this.badgesUrl}Flutter ${i + 1}.png`);
  cSharpBadges = Array.from({length: 5}, (_, i) => `${this.badgesUrl}CSharp ${i + 1}.png`);
  unityBadges = Array.from({length: 5}, (_, i) => `${this.badgesUrl}Unity ${i + 1}.png`);
  firebaseBadges = Array.from({length: 5}, (_, i) => `${this.badgesUrl}Firebase ${i + 1}.png`);

  fillerNav = Array.from({length: 2}, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(
    private authService: AuthService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

  ngOnInit(): void {

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

}
