import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuickViewPrescriptionsPageRoutingModule } from './quick-view-prescriptions-routing.module';

import { QuickViewPrescriptionsPage } from './quick-view-prescriptions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuickViewPrescriptionsPageRoutingModule
  ],
  declarations: [QuickViewPrescriptionsPage]
})
export class QuickViewPrescriptionsPageModule {}
