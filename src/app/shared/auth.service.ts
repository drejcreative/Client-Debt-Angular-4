import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(public _afAuth: AngularFireAuth) { }

  // Login
  login(email:string, password:string) {
    return new Promise((resolve, reject) => {
      this._afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }

  register(email:string, password:string) {
    return new Promise((resolve, reject) => {
      this._afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }

  // Check user status
  getAuth() {
    return this._afAuth.authState.map(auth => auth);
  }

  // logout
  logout() {
    this._afAuth.auth.signOut();
  }

}
