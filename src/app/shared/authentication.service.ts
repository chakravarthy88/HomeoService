import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/app';
import { User } from "./User.model";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { JsonPipe } from '@angular/common';

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
      } else {
        localStorage.setItem('User', null);
      }
    })
  }

  getUserData()
  {
    return JSON.parse(localStorage.getItem('UserData'));
  }

  getUserRole()
  {
    var userData = JSON.parse(localStorage.getItem('UserData'))
    if(userData != undefined && userData.userInDB != undefined)
    {
      var userInDB = userData.userInDB[0];
      return userInDB.role;
    }
  }

  // Login in with email/password
  async SignIn(email, password) {
    return await this.ngFireAuth.signInWithEmailAndPassword(email.trim(), password.trim());
  }

  CreateUser(uid, email, fullName) {
    return this.afStore.collection('Users').add({
      uid: uid,
      email: email,
      displayName: fullName,
      photoURL: '',
      emailVerified: false,
      role: "1"
    });
  }

  // Register User with email/password
  async RegisterUser(email, password) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(email, password)
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
    return this.ngFireAuth.currentUser.then(u => u.sendEmailVerification())
    .then(() => {
      this.router.navigate(['verify-email']);
    })
  }


  // SendVerificationMail() {
  //   return this.ngFireAuth.user.sendEmailVerification()
  //   .then(() => {
  //     this.router.navigate(['verify-email']);
  //   })
  // }

  // Returns true when User is looged in
  // get isLoggedIn(): boolean {
  //   const User = JSON.parse(localStorage.getItem('User'));
  //   return (User !== null && User.emailVerified !== false) ? true : false;
  // }

  // Returns true when User's email is verified
  isEmailVerified() {
    let user: any;
    user = JSON.parse(localStorage.getItem('User'));
    return (user != undefined && user.emailVerified != undefined && user.emailVerified == true) ? true : false;
  }

  // Sign in with Gmail
  // GoogleAuth() {
  //   //return new firebase.auth.GoogleAuthProvider();

  //   var provider = new firebase.auth.GoogleAuthProvider();
  //   //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  //   provider.addScope('https://www.googleapis.com/auth/plus.login');
  //   this.AuthLogin(provider);
  // }

  // // Auth providers
  // AuthLogin(provider) {
  //   this.ngFireAuth.signInWithRedirect(provider);
  //   // return this.ngFireAuth.signInWithPopup(provider)
  //   // .then((result) => {
  //   //    this.ngZone.run(() => {
  //   //       this.SetUserData(result.user);
  //   //       this.router.navigateByUrl('/tabs');
  //   //     })
  //   // }).catch((error) => {
  //   //   window.alert(error)
  //   // })
  // }

  // Store User in localStorage 
  async SetUserData(User) {

    // const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`Users/${User.uid}`);
    // const userData = {
    //   uid: User.uid,
    //   email: User.email,
    //   displayName: User.displayName,
    //   photoURL: User.photoURL,
    //   emailVerified: User.emailVerified
    // }
    // userRef.set(userData, {
    //   merge: true
    // })

    await this.afStore
      .collection('Users', ref => ref.where("uid", "==", User.uid))
      .valueChanges()
      .subscribe(a => {
        this.userData = {
          uid: User.uid,
          email: User.email,
          displayName: User.displayName,
          photoURL: User.photoURL,
          emailVerified: User.emailVerified,
          userInDB: a
        }

        localStorage.setItem('User', JSON.stringify(this.userData));
        localStorage.setItem('UserData', JSON.stringify(this.userData));

        if(this.isEmailVerified()) {
          this.router.navigateByUrl('/tabs');  
        } else {
          alert('Invalid Credentials, please try again');
          return false;
        }
      });
  }

  // Sign-out 
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem("User");
      localStorage.removeItem("UserData");
      this.router.navigate(['login']);
    })
  }

}