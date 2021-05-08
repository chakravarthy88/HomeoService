import { Injectable, NgZone } from '@angular/core';
import { firebase } from 'firebase/firebase-auth'
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Patient } from './patient.model';

@Injectable({
  providedIn: 'root'
})

export class MainService {
  patientData: AngularFireObject<any>;
  user: any;
  patientInfo: Patient;
  public patients: any[] = [];

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private db: AngularFireDatabase
  ) {
  }

  SavePatient(patient) {
    this.user = JSON.parse(localStorage.getItem('user'))
    var postListRef = this.db.database.ref('Patient');
    var newPostRef = postListRef.push();
    newPostRef.set({
      FirstName: 'Sriram paluri', LastName: 'Paluri', Mobile: '8047285979', Age: '35', Gender: 'Mail', addedBy: 'uid'
    });
  }

  createUaser(user: Patient){
    return this.afStore.collection('Pateient').add(user);
  }

  updateUser(user: Patient){
    delete user.uid;
    this.afStore.doc('Patient' + user.uid).update(user);
  }

  getMyPatients()
  {
    //return this.firestore.collection('Appointment').where('lockedBy', '==', '').get();
    this.afStore
      .collection('Patient', ref => ref.where("MailID", "==", localStorage.getItem("MailID")))
      .get()
      .subscribe(a => {
        a.forEach(aa => this.patients.push(aa.data()));
      });
    return this.patients;
  }
}