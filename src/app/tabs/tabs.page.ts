import { Component } from '@angular/core';
import { Router, Navigation} from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { MainService } from "../shared/main.service";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    public navCtrl: NavController,
    public router: Router,
    public service: MainService
  ) {}

  ngOnInit() {
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
