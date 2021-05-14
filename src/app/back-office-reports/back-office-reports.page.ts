import { Component, OnInit } from '@angular/core';
import { MainService } from "../shared/main.service";

@Component({
  selector: 'app-back-office-reports',
  templateUrl: './back-office-reports.page.html',
  styleUrls: ['./back-office-reports.page.scss'],
})
export class BackOfficeReportsPage implements OnInit {

  private boAppts: any[] = [];
  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.boAppts = this.mainService.getBackOfficeReports();
  }

}
