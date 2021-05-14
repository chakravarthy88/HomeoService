import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BackOfficeReportsPageRoutingModule } from './back-office-reports-routing.module';

import { BackOfficeReportsPage } from './back-office-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BackOfficeReportsPageRoutingModule
  ],
  declarations: [BackOfficeReportsPage]
})
export class BackOfficeReportsPageModule {}
