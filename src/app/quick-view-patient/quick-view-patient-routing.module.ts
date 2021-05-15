import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuickViewPatientPage } from './quick-view-patient.page';

const routes: Routes = [
  {
    path: '',
    component: QuickViewPatientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuickViewPatientPageRoutingModule {}
