import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication.service";
import firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public ngZone: NgZone, 
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
) { }

  ngOnInit() {
    this.ngFireAuth.getRedirectResult()
    .then((result) => {
      if(result.credential && result.user)
      {
        this.ngZone.run(() => {
          this.authService.SetUserData(result.user);
        })
      }
    }).catch((error) => {
      window.alert(error)
    })
  }

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        if(this.authService.isEmailVerified) {
          this.router.navigate(['']);          
        } else {
          
          window.alert('Email is not verified')
          return false;
        }
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  register(){
    this.router.navigate(['register']);
  }

}
