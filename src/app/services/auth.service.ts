import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { LoginData } from '../interfaces/login-data.interface';

@Injectable({
  providedIn: 'root'
})

//https://www.positronx.io/firebase-authentication-in-angular-8-with-angularfire2/
//https://betterprogramming.pub/angular-13-firebase-authentication-tutorial-with-angularfire-7-23dc8cee42c4
export class AuthService {


  constructor(private auth: AngularFireAuth) {
  }

  register(loginData: LoginData) {
    return this.auth.createUserWithEmailAndPassword(loginData.email, loginData.password);
  }

  login(loginData: LoginData) {
    return this.auth.signInWithEmailAndPassword(loginData.email, loginData.password);
  }

  logout() {
    return this.auth.signOut();
  }
}
