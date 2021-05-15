import { Component, OnInit } from '@angular/core';
import { MainService } from "../shared/main.service";
import { AlertController, ModalController } from '@ionic/angular';
import { ViewPrescriptionPage } from '../view-prescription/view-prescription.page';

@Component({
  selector: 'app-quick-view-prescriptions',
  templateUrl: './quick-view-prescriptions.page.html',
  styleUrls: ['./quick-view-prescriptions.page.scss'],
})
export class QuickViewPrescriptionsPage implements OnInit {

  public prescriptions: any = {};
  public uid: any;

  constructor(private service: MainService, private modalController: ModalController) { }

  ngOnInit() {
    this.prescriptions = this.service.getPatientAllAppointments(this.uid);
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
