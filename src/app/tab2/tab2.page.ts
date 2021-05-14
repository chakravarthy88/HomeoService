import { Component } from '@angular/core';
import { MainService } from "../shared/main.service";
import { Router } from '@angular/router';
import { AuthenticationService } from "../shared/authentication.service";
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public appointments: any[] = [];
  public appointmentsBackup: any[] = [];
  public isL1: boolean = false;
  public isL2: boolean = false;
  public showClosed: boolean = false;
  public userUID: boolean = false;
  public searchTerm: string = "";


  constructor(private service: MainService, private aservice: AuthenticationService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
    //this.setPageStateByRole();
  }

  ionViewWillEnter() {
    this.userUID = this.aservice.getUserData().uid;
    this.setPageStateByRole(true);
  }

  setPageStateByRole(isloadSpinner) {
    if(isloadSpinner)
    this.service.showLoadingSpinner();
    this.appointments = [];

    this.isL1 = this.aservice.getUserRole() == 2 ? true : false;
    this.isL2 = this.aservice.getUserRole() == 3 ? true : false;
    if (this.isL1)
    {
      this.appointments = this.service.getL1Appointments();
      
    }
    else if (this.isL2)
      this.appointments = this.service.getL2Appointments();
      

  }

  async filterList(evt) {
    this.appointments = this.appointmentsBackup;
    const searchTerm = evt.srcElement.value;
  
    if (!searchTerm) {
      return;
    }
  console.log(searchTerm);
    this.appointments = this.appointments.filter(appnt => appnt.PatientInfo.FirstName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1); 
    console.log("filtered res ");
  }  


  async LockAppointment(uid) {
    const al = await this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'This item will be locked for you, please complete the case without fail or unlock case. Are you sure?',
      buttons: [
        { text: 'No', role: 'Cancel' },
        {
          text: 'Yes',
          handler: () => {
            this.router.navigate(['view-appointment', uid])
          }
        }]
    });

    await al.present();
  }
}