import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { LoginData } from '../interfaces/login-data.interface';
import { Role, User } from '../models/user.model';

import { from, Observable, throwError, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';

import * as CONSTS from '../global/constants';

import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user: Observable<User> = null;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
  ) {

    this.user = this.auth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }
      )
    );

  }

  register(loginData: LoginData) {
    return from(this.auth.createUserWithEmailAndPassword(loginData.email, loginData.password))
      .pipe(
        map((resp: any) => {
          return true;
        }),
        catchError((err: any) => {
          console.log(err);
          return throwError(err);
        })
      );;
  }

  login(loginData: LoginData) {
    return from(this.auth.signInWithEmailAndPassword(loginData.email, loginData.password))
      .pipe(
        map((resp: any) => {
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
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      });
  }

  logout() {
    return this.auth.signOut();
  }

  private updateUserData(user) {

    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);

    userRef.get().subscribe(
      (value) => {

        let infoUser = value.data();

        const data: User = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: (infoUser) ? infoUser.role : Role.ROLE_USER
        };

        userRef.set(data, { merge: true });
      }
    );
  }

  private checkAuthorization(user: User, roles: Role[]): boolean {
    let isAuthorized: boolean = false;

    if (!user) {
      isAuthorized = false;
    }
    else {
      roles.forEach(role => {

        if (user.role == role) {
          isAuthorized = true;
        }
      });
    }

    return isAuthorized;
  }

  canEdit(user: User): boolean {
    const allowed = [Role.ROLE_ADMIN, Role.ROLE_TEACHER];
    return this.checkAuthorization(user, allowed);
  }

  // Devuelve los usuarios y cualquier cambio que en ellas que pase
  getUsers() {
    return this.db.collection(CONSTS.STORAGE_USERS).snapshotChanges();
  }

}
