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
  public uid: any;
  public isLocked: boolean;

  constructor(private service: MainService,
    private aservice: AuthenticationService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private alertCtl: AlertController
  ) { }

  ngOnInit() {
    this.setRoles();
    this.uid = this.aRouter.snapshot.paramMap.get('uid');
    this.service.getAppointmentId(this.uid).subscribe(res => {
      this.appointment = res;
      if (this.appointment.LockedBy != "") {
        this.isLocked = true;
        this.AppointmentNotAvailable();
      }
      else{
        debugger;
        var userData = JSON.parse(localStorage.getItem('UserData'))
        var uid = userData.userDataInDB.uid;
        this.service.LockAppointment(this.appointment, uid);
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
    this.service.sendToDoctor(this.appointment, this.aRouter.snapshot.paramMap.get('uid'));
  }

  CompleteDoctorReview() {
    this.service.completeReview(this.appointment, this.aRouter.snapshot.paramMap.get('uid'));
    var drName = this.aservice.getUserData().displayName;
    this.service.tagDoctor(this.appointment.PatientID, drName);
  }
}
