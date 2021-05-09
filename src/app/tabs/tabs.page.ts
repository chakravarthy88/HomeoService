import { Component } from '@angular/core';
import { Router, Navigation} from '@angular/router';
import { NavController } from '@ionic/angular';
import { MainService } from "../shared/main.service";
import { AuthenticationService } from "../shared/authentication.service";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public isL1: boolean = false;
  public isL2: boolean = false;
  
  constructor(
    private navCtrl: NavController,
    private router: Router,
    private aservice: AuthenticationService,
    private service: MainService
  ) {}


  ionViewWillEnter() {
    this.isL1 = this.aservice.getUserRole() == 2 ? true : false;
    this.isL2 = this.aservice.getUserRole() == 3 ? true : false;
    if(JSON.parse(localStorage.getItem('User')) == null)
    {
       this.router.navigate(['login']);
    }    
  }

  AddNewPatient(){
    this.router.navigate(['add-patient']);
  }

  UnLockAllMyCases()
  {
    this.service.UnLockAllMyCases(this.service.getUserData().uid);
  }

  Logout(){
    localStorage.removeItem("User");
    localStorage.removeItem("UserData");
    this.router.navigate(['login']);
  }

}
