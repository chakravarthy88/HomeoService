import { Input, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from "../shared/main.service";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-prescription',
  templateUrl: './view-prescription.page.html',
  styleUrls: ['./view-prescription.page.scss'],
})

export class ViewPrescriptionPage implements OnInit {

  public prescriptions: any = {};
  @Input()
  public uid: any;
  public patientInfo: any = {};

  constructor(private service: MainService, private router: Router, private aRouter: ActivatedRoute, public alertController: AlertController) { 
    this.aRouter.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.uid = this.router.getCurrentNavigation().extras.state.patientID;
      }
    });
  }

  ngOnInit() {
    this.prescriptions = this.service.getPatientAllAppointments(this.uid);
            console.log(this.prescriptions)
   this.presentDisclaimerAlert()
     
  }

  async presentAlertConfirm(apptId) {
    const alert = await this.alertController.create({
      header: 'Confirm Cancel Appointment',
      cssClass: 'alertClass',
      animated: true,
      message: 'Message <strong>Are you sure you want to cancel the appointment</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
           
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.service.updateReviewStatus(apptId, "CancelledByPatient");
            this.prescriptions = this.service.getPatientAllAppointments(this.uid);
          }
        }
      ]
    });

    await alert.present();
  }
  ngOnChanges(){
  
   
  }

  cancelAppointment(apptId){

    this.presentAlertConfirm(apptId);
      

  }

  async presentDisclaimerAlert() {
    const alert = await this.alertController.create({
      header: 'Disclaimer',
      cssClass: 'alertClass',
      animated: true,
      message: '<span class="blockSpan redText"><strong>Terms of Use</strong><span> This is only an alterntaive support service. Patients are advised to visit nearest hospital for any emergencies. Patients with co-morbidities like hypertension, diabetes etc., are advised to continue their respective medications and continue taking consultantion from their family physician(s). Our panel of doctors or volunteers cannot be held responsible for any casuality as we are not in physical contact with the patient and cannot assess the condition continuously.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.router.navigate(['tabs']);
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            
            
          }
        }
      ]
    });

    await alert.present();
  }
}