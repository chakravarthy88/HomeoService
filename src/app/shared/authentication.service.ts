import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/app';
import { User } from "./User.model";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  public userData: any = {};

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone 
  ) {
    this.ngFireAuth.authState.subscribe(User => {
      if (User) {
        this.userData = User;
        localStorage.setItem('User', JSON.stringify(this.userData));
        // JSON.parse(localStorage.getItem('User'));
      } else {
        localStorage.setItem('User', null);
        // JSON.parse(localStorage.getItem('User'));
      }
    })
  }

  getUserData()
  {
    return JSON.parse(localStorage.getItem('UserData'));
  }

  getUserRole()
  {
    return JSON.parse(localStorage.getItem('UserData')).userDataInDB.role;
  }

  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password)
  }

  // Register User with email/password
  RegisterUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
  }

  // Recover password
  PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email has been sent, please check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  SendVerificationMail() {
    // return this.ngFireAuth.currentUser.sendEmailVerification()
    // .then(() => {
    //   this.router.navigate(['verify-email']);
    // })
  }

  // Returns true when User is looged in
  get isLoggedIn(): boolean {
    const User = JSON.parse(localStorage.getItem('User'));
    return (User !== null && User.emailVerified !== false) ? true : false;
  }

  // Returns true when User's email is verified
  get isEmailVerified(): boolean {
    const User = JSON.parse(localStorage.getItem('User'));
    return (User.emailVerified !== false) ? true : false;
  }

  // Sign in with Gmail
  GoogleAuth() {
    //return new firebase.auth.GoogleAuthProvider();

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    this.AuthLogin(provider);
  }

  // Auth providers
  AuthLogin(provider) {
    return this.ngFireAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.SetUserData(result.user);
          this.router.navigate(['']);
        })
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Store User in localStorage 
  SetUserData(User) {

    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${User.uid}`);
    const userData = {
      uid: User.uid,
      email: User.email,
      displayName: User.displayName,
      photoURL: User.photoURL,
      emailVerified: User.emailVerified
    }
    userRef.set(userData, {
      merge: true
    })

    this.afStore
      .collection('Users')
      .doc(User.uid)
      .valueChanges()
      .subscribe(a => {

        this.userData = {
          uid: User.uid,
          email: User.email,
          displayName: User.displayName,
          photoURL: User.photoURL,
          emailVerified: User.emailVerified,
          userDataInDB: a
        }
        localStorage.setItem('UserData', JSON.stringify(this.userData));
      });
  }

  // Sign-out 
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('User');
      this.router.navigate(['login']);
    })
  }

}