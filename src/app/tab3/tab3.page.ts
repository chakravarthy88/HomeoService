import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private router: Router) {
    //this.router.navigate(['login']);
  }

  ngOnInit() {
    // localStorage.removeItem("User");
    // localStorage.removeItem("UserData");
    // this.router.navigate(['login']);
  }

}
