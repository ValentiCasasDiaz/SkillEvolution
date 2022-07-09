import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { LoginData } from '../interfaces/login-data.interface';
import { User } from '../models/user.model';

import { STORAGE_USER } from '../global/constants';

import { from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private user: User = null;

  constructor(private auth: AngularFireAuth) {
  }

  register(loginData: LoginData) {
    return this.auth.createUserWithEmailAndPassword(loginData.email, loginData.password);
  }

  login(loginData: LoginData) {
    return from(this.auth.signInWithEmailAndPassword(loginData.email, loginData.password))
      .pipe(
        map((resp: any) => {
          this.saveUser(resp);
          return true;
        }),
        catchError((err: any) => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    return from(this.auth.signInWithPopup(provider))
      .pipe(
        map((resp: any) => {
          this.saveUser(resp);
          return true;
        }),
        catchError((err: any) => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  logout() {
    this.user = null;
    localStorage.removeItem(STORAGE_USER);
    return this.auth.signOut();
  }

  saveUser(resp) {
    this.user = new User(resp.user.displayName, resp.user.email, resp.user.photoURL, resp.user.uid);
    localStorage.setItem(STORAGE_USER, JSON.stringify(this.user));
  }

  getUserID(): string {

    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem(STORAGE_USER));
    }

    return this.user.id;
  }
}
