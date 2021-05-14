import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuickViewPrescriptionsPage } from './quick-view-prescriptions.page';

const routes: Routes = [
  {
    path: '',
    component: QuickViewPrescriptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuickViewPrescriptionsPageRoutingModule {}
