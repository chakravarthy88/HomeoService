import { Component } from '@angular/core';
import { Router, Navigation} from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    public navCtrl: NavController,
    public router: Router
  ) {}

  ngOnInit() {
    
    //alert(JSON.parse(localStorage.getItem('user')))
    if(JSON.parse(localStorage.getItem('User')) == null)
    {
       //alert("nouser");
       this.router.navigate(['login']);
    }
    
  }
  AddNewPatient(){
    this.router.navigate(['add-patient']);
  }

  Logout(){
    localStorage.removeItem("User");
    localStorage.removeItem("UserData");
    this.router.navigate(['login']);
  }

}
