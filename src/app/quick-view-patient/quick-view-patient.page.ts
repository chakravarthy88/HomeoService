import { Component, OnInit } from '@angular/core';
import { MainService } from "../shared/main.service";
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-quick-view-patient',
  templateUrl: './quick-view-patient.page.html',
  styleUrls: ['./quick-view-patient.page.scss'],
})
export class QuickViewPatientPage implements OnInit {

  public patient: any = {};
  public uid: any;

  constructor(private service: MainService, private modalController: ModalController) { }

  ngOnInit() {
    var p = this.service.getPatientById(this.uid);
    p.forEach(a => this.patient = a.data());
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}