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

  getUserData(){
    return JSON.parse(localStorage.getItem('user'));
  }

  SavePatient(patient) {
    return this.afStore.collection('Patients').add(patient);
  }

  SaveAppointment(patient) {
    return this.afStore.collection('Appointment').add(patient);
  }

  updateUser(user: Patient){
    delete user.uid;
    this.afStore.doc('Patients' + user.uid).update(user);
  }

  getMyPatients()
  {
    console.log('loading-patients');
    this.patients = [];
    this.afStore
      .collection('Patients', ref => ref.where("RegisteredBy", "==", this.getUserData().uid))
      .get()
      .subscribe(a => {
        a.forEach(aa => 
          this.patients.push(this.buildPatient(aa.data(), aa))
        )
      });
    console.log(this.patients);
    return this.patients;
  }

  buildPatient(data, doc)
  {
     var patientInfo: Patient = {
      uid: doc.id,
      MailID: data.MailID,
      FirstName: data.FirstName,
      LastName: data.LastName,
      Mobile: data.Mobile,
      Age: data.Age,
      Gender: data.Gender
     };
     return patientInfo;
  }
}