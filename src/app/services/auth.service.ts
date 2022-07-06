import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { LoginData } from '../interfaces/login-data.interface';

import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private auth: AngularFireAuth) {
  }

  register(loginData: LoginData) {
    return this.auth.createUserWithEmailAndPassword(loginData.email, loginData.password);
  }

  login(loginData: LoginData) {
    return this.auth.signInWithEmailAndPassword(loginData.email, loginData.password);
  }

  loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    return this.auth.signInWithPopup(provider);
  }

  logout() {
    return this.auth.signOut();
  }
}
