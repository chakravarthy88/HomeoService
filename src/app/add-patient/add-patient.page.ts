import { Component, OnInit } from '@angular/core';
import { Patient} from 'src/app/shared/Patient';
import { MainService} from 'src/app/shared/Servie'

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.page.html',
  styleUrls: ['./add-patient.page.scss'],
})
export class AddPatientPage implements OnInit {
patient: Patient;
  constructor(
    private svc: MainService
  ) { }

  ngOnInit() {
  }

  SavePatient(){

    this.svc.SavePatient(this.patient);

  }

}
