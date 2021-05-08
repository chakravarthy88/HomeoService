import { Injectable, NgZone } from '@angular/core';
import { firebase } from 'firebase/firebase-auth'
import { Patient } from "./Patient";
import { AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class MainService {
  patientData: AngularFireObject<any>;
  user: any;
  patientInfo : Patient;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone,
    private db: AngularFireDatabase
  ){
  }

  SavePatient(patient) {
    //alert("avePatient");


     this.user = JSON.parse(localStorage.getItem('user'))

     var postListRef = this.db.database.ref('Patient');
    var newPostRef = postListRef.push();
        newPostRef.set({
            FirstName: 'Sriram paluri', LastName: 'Paluri', Mobile: '8047285979', Age: '35', Gender: 'Mail', addedBy: 'uid'
        });

    //   this.patientData = this.db.object('Patient');
    //   const patientRef = this.db.object('Patient');
    //   patientRef.set({FirstName: 'Sriram paluri', LastName: 'Paluri', Mobile: '8047285979', Age: '35', Gender: 'Mail'});
    //alert("patinetsavedone");
}

}