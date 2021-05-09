import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'add-patient',
    loadChildren: () => import('./add-patient/add-patient.module').then( m => m.AddPatientPageModule)
  },
  {
    path: 'new-appointment/:uid',
    loadChildren: () => import('./new-appointment/new-appointment.module').then( m => m.NewAppointmentPageModule)
  },
  {
    path: 'new-appointment',
    loadChildren: () => import('./new-appointment/new-appointment.module').then( m => m.NewAppointmentPageModule)
  },
  {
    path: 'view-appointment',
    loadChildren: () => import('./view-appointment/view-appointment.module').then( m => m.ViewAppointmentPageModule)
  },
  {
    path: 'view-appointment/:uid',
    loadChildren: () => import('./view-appointment/view-appointment.module').then( m => m.ViewAppointmentPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
  }
}
