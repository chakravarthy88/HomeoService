import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Patient} from 'src/app/shared/patient.model';
import { MainService} from 'src/app/shared/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.page.html',
  styleUrls: ['./add-patient.page.scss'],
})
export class AddPatientPage implements OnInit {
  
  public patient: any = {};
  
  constructor(
    private mainService: MainService,
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  SavePatient(){

    console.log(this.patient);
    this.mainService.showLoadingSpinner();
    
    var userData = JSON.parse(localStorage.getItem('UserData'));
    //this.patient.MailID = userData.email;
    this.patient.RegisteredBy = userData.uid;
    this.patient.TaggedDoctor = "Not Tagged to Doctor";

    this.mainService.SavePatient(this.patient);
    this.mainService.showToastMessage("Patient Added Successfully");
    this.router.navigate(['tabs']);
  }

  goToHome(){
    this.router.navigate(['tabs']);
  }

}
