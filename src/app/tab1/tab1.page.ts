import { Component } from '@angular/core';
import { MainService } from "../shared/main.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private patientService: MainService) {}

}
