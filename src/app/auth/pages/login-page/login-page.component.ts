import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginData } from 'src/app/interfaces/login-data.interface';

import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer)
    {
      this.matIconRegistry.addSvgIcon(
        "google",
        this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/logos/google.svg")
      );
    }

    ngOnInit(): void {}

    login(loginData: LoginData) {
      this.authService.login(loginData).subscribe(
        (next) => {
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log(error);
        });
    }

    loginWithGoogle() {
      this.authService.loginWithGoogle().then(
        (next) => {
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log(error);
        });
    }

}
