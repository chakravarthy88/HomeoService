import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication.service";
import { User } from '../shared/User.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  CreateUser(user, email, fullname) {
    this.authService.CreateUser(user.uid, email, fullname);
  }

  signUp(email, password, fullname) {
    this.authService.RegisterUser(email.value, password.value)
      .then((res) => {
        this.CreateUser(res.user, email.value, fullname.value);
        this.authService.SendVerificationMail()
        this.router.navigate(['verify-email']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

}
