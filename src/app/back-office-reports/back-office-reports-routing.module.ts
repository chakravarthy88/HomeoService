import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BackOfficeReportsPage } from './back-office-reports.page';

const routes: Routes = [
  {
    path: '',
    component: BackOfficeReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackOfficeReportsPageRoutingModule {}
