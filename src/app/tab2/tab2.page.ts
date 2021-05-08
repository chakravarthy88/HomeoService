import { Component } from '@angular/core';
import { MainService } from "../shared/main.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public appointments: any[] = [];
  
  constructor(private service: MainService, private router: Router) {}

  ngOnInit(){
    this.appointments = this.service.getNewAppointments()
  }

  LockAppointment(uid)
  {
    this.router.navigate(['view-appointment', uid]);
  }
  SendToDoctor()
  {
    
  }
  UpdatePrescription()
  {

  }
  CloseAppointment()
  {

  }
}
