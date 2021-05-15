import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Patient } from 'src/app/shared/patient.model';
import { MainService } from 'src/app/shared/main.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.page.html',
  styleUrls: ['./add-patient.page.scss'],
})
export class AddPatientPage implements OnInit {

  public uid: any;
  public patient: any = {};
  public isEdit: boolean = false;
  constructor(
    private mainService: MainService,
    private router: Router,
    private aRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.uid = this.aRouter.snapshot.paramMap.get('uid');
    if (this.uid != undefined || this.uid != '') {
      this.isEdit = true;
      var result = this.mainService.getPatientById(this.uid);
      result.forEach(a => this.patient = a.data())
    }
  }

  SavePatient() {

    console.log(this.patient);
    this.mainService.showLoadingSpinner();

    var userData = JSON.parse(localStorage.getItem('UserData'));
    //this.patient.MailID = userData.email;
    this.patient.RegisteredBy = userData.uid;
    this.patient.TaggedDoctor = "Not Tagged to Doctor";

    if(this.isEdit)
    {
      this.mainService.UpdatePatient(this.patient, this.uid);
      this.mainService.showToastMessage("Patient Updated Successfully");
    }
    else
    {
      this.mainService.SavePatient(this.patient);
      this.mainService.showToastMessage("Patient Added Successfully");
    }
    this.router.navigate(['tabs']);
  }

  goToHome() {
    this.router.navigate(['tabs']);
  }

}
