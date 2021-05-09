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
    if(JSON.parse(localStorage.getItem('user')) == null)
    {
       //alert("nouser");

       //this.router.navigate(['login']);
    }
    
  }
  AddNewPatient(){
    //alert("hello");
    this.router.navigateByUrl('/add-patient', { replaceUrl:true });
  }


}
