import { Component } from '@angular/core';
import { Router, Navigation } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MainService } from "../shared/main.service";
import { AuthenticationService } from "../shared/authentication.service";
// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public isL1: boolean = false;
  public isL2: boolean = false;
  public showQueue: boolean = false;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private aservice: AuthenticationService,
    private service: MainService    
    //,private notifications: LocalNotifications
  ) { }


  ngOnInit() {
    var uData = this.aservice.getUserData();
    if (uData == null || uData.userInDB == undefined) {
      console.log('wrong-login')
      this.router.navigate(['login']);
    }

    this.isL1 = this.aservice.getUserRole() == 2 ? true : false;
    this.isL2 = this.aservice.getUserRole() == 3 ? true : false;
    this.showQueue = this.isL1 || this.isL2;

    // this.notifications.schedule({
    //   id: 1,
    //   text: 'Report Your Health Status & Get Your Appointment for immediate attention',
    //   trigger: { every: { minute: 5 } }
    // });

    // this.notifications.schedule({
    //   title: 'Design team meeting',
    //   trigger: { every: 'day', count: 5 }
    // });
  }

  ionViewDidEnter() {
    // var uData = this.aservice.getUserData();    
    // if(uData == null || uData.userDataInDB == undefined)
    // {
    //   console.log('wrong-login')
    //   this.router.navigate(['login']);
    // }
  }

  AddNewPatient() {
    this.router.navigate(['add-patient']);
  }

  UnLockAllMyCases() {
    this.service.UnLockAllMyCases(this.service.getUserData().uid);
  }

  Reload() {
    window.location.reload();
  }

  Logout() {
    this.aservice.SignOut();
    //this.router.navigate(['login']);
  }

}
