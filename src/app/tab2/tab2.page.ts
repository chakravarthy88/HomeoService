import { Component } from '@angular/core';
import { MainService } from "../shared/main.service";
import { Router } from '@angular/router';
import { AuthenticationService } from "../shared/authentication.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public appointments: any[] = [];
  public isL1: boolean = false;
  public isL2: boolean = false;
  
  constructor(private service: MainService, private aservice: AuthenticationService, private router: Router) {}

  ngOnInit(){
    this.setPageStateByRole();
  }

  ngOnChanges() {
    this.setPageStateByRole();
  }

  setPageStateByRole()
  {
    this.isL1 = this.aservice.getUserRole() == 2 ? true : false;
    this.isL2 = this.aservice.getUserRole() == 3 ? true : false;
      if(this.isL1)
        this.appointments = this.service.getL1Appointments();
      else if(this.isL2)
        this.appointments = this.service.getL2Appointments();
  }

  LockAppointment(uid)
  {
    //confirm if user wants to lock this 
    this.router.navigate(['view-appointment', uid]);
  }
}
