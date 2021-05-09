import { Component, OnInit } from '@angular/core';
import { MainService } from "../shared/main.service";
import { Router, ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.page.html',
  styleUrls: ['./new-appointment.page.scss'],
})
export class NewAppointmentPage implements OnInit {

  public appointment: any = {};
  public uid: any;
  public patientInfo: any = {};

  constructor(private service: MainService, private router: Router, private aRouter: ActivatedRoute) {
    this.appointment.BodyPains = false;
    this.appointment.BrethelessWeesing = false;
    this.appointment.ChestTightness = false;
    this.appointment.Cold = false;
    this.appointment.Cough = false;
    this.appointment.CoughtClipping = false;
    this.appointment.Diarrhoea = false;
    this.appointment.Drowsy = false;
    this.appointment.FeverWithChills = false;
    this.appointment.Nausea = false;
    this.appointment.Thirst = false;
    this.appointment.TieredRestless = false;
  }

  ngOnInit() {
    this.uid = this.aRouter.snapshot.paramMap.get('uid');
  }

  getPatientById(uid)
  {
    return this.service.getPatientById(uid);
  }

  SaveAppointment(){

    console.log(this.appointment);

    var userData = JSON.parse(localStorage.getItem('user'));
    this.getPatientById(this.aRouter.snapshot.paramMap.get('uid')).subscribe(res =>
      {
        this.patientInfo = res;
        this.appointment.ReviewStatus = "ReadyForReview";
        this.appointment.LockedBy = "";
        this.appointment.AppointmentClosed = false;
        this.appointment.PatientID = this.uid;
        this.appointment.PatientName = this.patientInfo.FirstName + ", " + this.patientInfo.LastName;
        this.appointment.PatientInfo = this.patientInfo;
        this.appointment.SymptomDate  = new Date();
        this.appointment.L1Reviewed = false;
        this.appointment.L1ExplainedMedicine = false;
        this.appointment.L2Reviewed = false;
        this.appointment.DoctorPrescription = "";

        //this.appointment.uid = this.aRouter.snapshot.paramMap.get('uid');//this.uid;
        this.appointment.MailID = userData.email;
        this.appointment.RegisteredBy = userData.uid;

        this.service.SaveAppointment(this.appointment);
        this.router.navigate(['']);
      }
    );    
  }

  goToHome(){
    this.router.navigate(['']);
  }

}
