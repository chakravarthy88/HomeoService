import { Component } from '@angular/core';
import { MainService } from "../shared/main.service";
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public patients: any[] = [];
  
  constructor(private patientService: MainService, private router: Router) {}

  ngOnInit(){
    //this.patients = [];
    //this.patients = this.patientService.getMyPatients();
  }

  ionViewWillEnter()
  {
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
