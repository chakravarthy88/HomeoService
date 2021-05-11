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

  SendToDoctor() {
    this.service.showLoadingSpinner();
    this.service.sendToDoctor(this.appointment, this.aRouter.snapshot.paramMap.get('uid'));
    this.service.showToastMessage("Appointment Sent to Doctor Successfully");
  }

  CompleteDoctorReview() {
    this.service.showLoadingSpinner();
    this.service.completeReview(this.appointment, this.aRouter.snapshot.paramMap.get('uid'));
    var drName = this.aservice.getUserData().displayName;
    this.service.tagDoctor(this.appointment.PatientID, drName);
    this.service.showToastMessage("Review Completed Successfully");
  }
}
