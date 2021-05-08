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
    private svc: MainService,
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  SavePatient(){

    console.log(this.patient);

    var userData = JSON.parse(localStorage.getItem('user'));
    this.patient.MailID = userData.email;
    this.patient.RegisteredBy = userData.uid;

    this.svc.SavePatient(this.patient);
    this.router.navigate(['']);
  }

  goToHome(){
    this.router.navigate(['']);
  }

}
