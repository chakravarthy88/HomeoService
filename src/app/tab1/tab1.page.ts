import { Component } from '@angular/core';
import { MainService } from "../shared/main.service";
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public patients: any[] = [];
  
  
  constructor(private patientService: MainService, 
    private router: Router,
    private alertCtl: AlertController
    ) {
      this.IntroMessage();
    }

  ngOnChanges(){
    if(this.patients.length ==0 )
    {
      this.patients = this.patientService.getMyPatients();
    }
  }

  async IntroMessage() {
    const al = await this.alertCtl.create({
      message: 'If you need urgent attention, please WhatsApp Here https://tiny.cc/homoeoservice',
      buttons: [{ text: 'Ok', role: 'Cancel' }]
    });

    await al.present();
  }


  ionViewWillEnter()
  {
    this.patientService.showLoadingSpinner();
    this.patients = [];
    this.patients = this.patientService.getMyPatients();
  }

  NewAppointment(uid)
  {
    console.log(uid);
    //Pass route param
    this.router.navigate(['new-appointment', uid]);
  }

  viewPrescription(uid)
  {
    console.log(uid);
    let navigationExtras: NavigationExtras = {
      state: {
        patientID: uid
      }
    };
    this.router.navigate(['view-prescription'], navigationExtras);
  }

  
}
