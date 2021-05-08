import { Component, OnInit } from '@angular/core';
import { MainService } from "../shared/main.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.page.html',
  styleUrls: ['./new-appointment.page.scss'],
})
export class NewAppointmentPage implements OnInit {

  public appointment: any = {};
  public uid: any;

  constructor(private service: MainService, private router: Router, private aRouter: ActivatedRoute) {}

  ngOnInit() {
    this.uid = this.aRouter.snapshot.paramMap.get('id');
  }

  SaveAppointment(){

    console.log(this.appointment);

    var userData = JSON.parse(localStorage.getItem('user'));
    
    this.appointment.LockedBy = "";
    this.appointment.AppointmentClosed = false;
    this.appointment.PatientID = "";
    this.appointment.ContactNumber = ""
    this.appointment.DoctorPrescription = "";
    this.appointment.SymptomDate  = new Date();
    this.appointment.L1Reviewed = false;
    this.appointment.L1ExplainedMedicine = false;

    this.appointment.uid = this.uid;
    this.appointment.MailID = userData.email;
    this.appointment.RegisteredBy = userData.uid;

    this.service.SaveAppointment(this.appointment);
    this.router.navigate(['']);
  }

  goToHome(){
    this.router.navigate(['']);
  }

}
