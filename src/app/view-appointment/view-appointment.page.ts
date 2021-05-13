import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from "../shared/main.service";
import { AuthenticationService } from "../shared/authentication.service";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.page.html',
  styleUrls: ['./view-appointment.page.scss'],
})
export class ViewAppointmentPage implements OnInit {

  public appointment: any = {};
  public isL1: boolean = false;
  public isL2: boolean = false;
  public patientInfo: any = {};
  public apptUID: any;
  public Symptoms: boolean = true;
  public Temparature: boolean = true;
  public FeverPeaksIn: boolean = true;
  public MucusColorTexture: boolean = true;
  public PulseRate: boolean = true;
  public PeculiarSymptoms: boolean = true;
  public SleepSymptoms: boolean = true;
  public OXIMeterReading: boolean = true;
  public isSubmitted: boolean = false;

  constructor(private service: MainService,
    private aservice: AuthenticationService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private alertCtl: AlertController
  ) { }

  ngOnInit() {
    this.apptUID = this.aRouter.snapshot.paramMap.get('uid');
    this.setRoles();
    this.service.getAppointmentId(this.apptUID).subscribe(res => {
      this.appointment = this.service.buildAppointment(res, this.apptUID);
      this.patientInfo = this.appointment.PatientInfo;
      this.appointment.IsAcquirable = this.appointment.LockedBy === '' || this.appointment.LockedBy === this.service.getUserUID();
      if (!this.appointment.IsAcquirable) {
        this.AppointmentNotAvailable();
      }
      else {
        var userData = JSON.parse(localStorage.getItem('UserData'))
        var userUID = userData.userInDB.uid;
        if(this.appointment.LockedBy != this.service.getUserUID())
        {
          this.service.LockAppointment(this.apptUID, userUID);
        }
      }
    });
  }

  async AppointmentNotAvailable() {
    const al = await this.alertCtl.create({
      header: 'Not Available?',
      message: 'This appointment is already taken by other member, please pick other item?',
      buttons: [{ text: 'Ok', role: 'Cancel' }]
    });

    await al.present();
  }

  setRoles() {
    this.isL1 = this.aservice.getUserRole() == 2 ? true : false;
    this.isL2 = this.aservice.getUserRole() == 3 ? true : false;
  }

  goToHome() {
    this.router.navigate(['tabs']);
  }

  checkValidation(){
    console.log(this.appointment);
    this.Symptoms = (this.appointment.Symptoms != undefined && this.appointment.Symptoms.length > 0);
    this.Temparature = (this.appointment.Temparature != undefined && this.appointment.Temparature.length > 0)
    this.FeverPeaksIn = (this.appointment.FeverPeaksIn != undefined && this.appointment.FeverPeaksIn.length > 0)
    this.MucusColorTexture = (this.appointment.MucusColorTexture != undefined && this.appointment.MucusColorTexture.length > 0)
    this.PulseRate = (this.appointment.PulseRate != undefined && this.appointment.PulseRate.length > 0)
    this.PeculiarSymptoms = (this.appointment.PeculiarSymptoms != undefined && this.appointment.PeculiarSymptoms.length > 0)
    this.SleepSymptoms = (this.appointment.SleepSymptoms != undefined && this.appointment.SleepSymptoms.length > 0)
    this.OXIMeterReading = (this.appointment.OXIMeterReading != undefined && this.appointment.OXIMeterReading.length > 0)

    console.log(this.appointment);
    return (this.Symptoms && this.Temparature && this.FeverPeaksIn && this.MucusColorTexture && this.PulseRate && this.PeculiarSymptoms
      && this.SleepSymptoms && this.OXIMeterReading);
  }

  SendToDoctor() {
    this.isSubmitted = true;
    if(this.checkValidation())
    {
    this.service.showLoadingSpinner();
    this.service.sendToDoctor(this.appointment, this.aRouter.snapshot.paramMap.get('uid'));
    this.service.showToastMessage("Appointment Sent to Doctor Successfully");
    }
    else
    {
       return false;
    }
  }

  NoConsultRequired(){
    this.service.showLoadingSpinner();
    this.service.completeReview(this.appointment, this.aRouter.snapshot.paramMap.get('uid'));
    this.service.showToastMessage("Appointment closed without Doctor consultation");
  }
  
  CompleteDoctorReview() {
    this.service.showLoadingSpinner();
    this.service.completeReview(this.appointment, this.aRouter.snapshot.paramMap.get('uid'));
    var drName = this.aservice.getUserData().displayName;
    this.service.tagDoctor(this.appointment.PatientID, drName);
    this.service.showToastMessage("Review Completed Successfully");
  }
}
