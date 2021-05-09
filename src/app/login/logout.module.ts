import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
})
export class LogoutModule {
    constructor(private router: Router) {
        //this.router.navigate(['login']);
    }
    
    ngOnInit() {
        //this.router.navigate(['login']);
    }
    
}
