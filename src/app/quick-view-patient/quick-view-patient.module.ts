import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuickViewPatientPageRoutingModule } from './quick-view-patient-routing.module';

import { QuickViewPatientPage } from './quick-view-patient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuickViewPatientPageRoutingModule
  ],
  declarations: [QuickViewPatientPage]
})
export class QuickViewPatientPageModule {}
