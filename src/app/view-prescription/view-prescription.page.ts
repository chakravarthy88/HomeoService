import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from "../shared/main.service";

@Component({
  selector: 'app-view-prescription',
  templateUrl: './view-prescription.page.html',
  styleUrls: ['./view-prescription.page.scss'],
})

export class ViewPrescriptionPage implements OnInit {

  public prescriptions: any = {};
  public uid: any;
  public patientInfo: any = {};

  constructor(private service: MainService, private router: Router, private aRouter: ActivatedRoute) { 
    this.aRouter.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.uid = this.router.getCurrentNavigation().extras.state.patientID;
      }
    });
  }

  ngOnInit() {
     this.prescriptions = this.service.getPatientAllAppointments(this.uid);
     console.log(this.prescriptions)
  }

  ngOnChanges(){
   
  }
}