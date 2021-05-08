import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from "../shared/main.service";

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.page.html',
  styleUrls: ['./view-appointment.page.scss'],
})
export class ViewAppointmentPage implements OnInit {

  public appointment: any = {};
  public uid: any;
  public patientInfo: any = {};

  constructor(private service: MainService, private router: Router, private aRouter: ActivatedRoute) {}

  ngOnInit() {
    this.uid = this.aRouter.snapshot.paramMap.get('uid');
    this.service.getAppointmentId(this.uid).subscribe(
      res => this.appointment = res
    );
  }

  goToHome(){
    this.router.navigate(['']);
  }

}
