import {Injectable, NgZone} from '@angular/core';
// @ts-ignore
import {auth} from 'firebase/auth';
import {User} from '../model/user';
import {Router} from '@angular/router';
import {GoogleAuthProvider} from "firebase/auth";
import {AuthProvider} from "firebase/auth";

// @ts-ignore
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;

  // https://github.com/angular/angularfire/issues/2409
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.ngFireAuth.authState.subscribe((user: User) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') ?? '');
      } else {
        localStorage.removeItem('user');
        JSON.parse(localStorage.getItem('user') ?? '');
      }
    });
  }

  // Login in with email/password
  SignIn(email: string, password: string) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  // Register user with email/password
  RegisterUser({email, password}: { email: any, password: any }) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  // Recover password
  PasswordRecover({passwordResetEmail}: { passwordResetEmail: any }) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email has been sent, please check your inbox.');
      }).catch((error) => {
        window.alert(error);
      });
  }

  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  // Auth providers
  AuthLogin(provider: AuthProvider): Promise<any> {
    return this.ngFireAuth.signInWithPopup(provider)
      .then(async (result) => {
        await this.ngZone.run(async () => {
          await this.router.navigate(['tabs/ngrok']);
        });
        await this.SetUserData({user: result.user});
      }).catch((error) => {
        window.alert(error);
      });
  }

  // Store user in localStorage
  SetUserData({user}: { user: any }) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign-out
  SignOut() {
    return this.ngFireAuth.signOut()
      .then(async () => {
        localStorage.removeItem('user');
        await this.router.navigate(['login']);
      });
  }

}
