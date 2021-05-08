import { DebugElement, Injectable, NgZone } from '@angular/core';
import { firebase } from 'firebase/firebase-auth'
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Patient } from './patient.model';
import { Appointment } from './appointment.model';


@Injectable({
  providedIn: 'root'
})

export class MainService {
  patientData: AngularFireObject<any>;
  user: any;
  patientInfo: Patient;
  public patients: any[] = [];
  public appoints: any[] = [];

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private db: AngularFireDatabase
  ) {
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('user'));
  }

  SavePatient(patient) {
    return this.afStore.collection('Patients').add(patient);
  }

  SaveAppointment(patient) {
    return this.afStore.collection('Appointments').add(patient);
  }

  updateUser(user: Patient) {
    delete user.uid;
    this.afStore.doc('Patients' + user.uid).update(user);
  }

  getMyPatients() {
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

  getNewAppointments() {
    console.log('loading-appoints');
    this.appoints = [];
    this.afStore
      .collection('Appointments', ref => ref.where("L1Reviewed", "==", false))
      .get()
      .subscribe(a => {
        a.forEach(aa =>
          this.appoints.push(this.buildAppointment(aa.data(), aa))
        )
      });
    console.log(this.appoints);
    return this.appoints;

    // return this.afStore
    //   .collection('', ref => ref.where("L1Reviewed", "==", false))
    //   .get();
  }

  getPatientById(uid) {
    return this.afStore
      .collection('Patients')
      .doc(uid)
      .valueChanges();
  }

  getAppointmentId(uid) {
    return this.afStore
      .collection('Appointments')
      .doc(uid)
      .valueChanges();
  }

  sendToDoctor() {
    // return this.angularFirestore
    //     .collection("user-collection")
    //     .doc(id)
    //     .update({
    //       name: user.name,
    //       email: user.email,
    //       contact: user.contact
    //     });
  }

  buildPatient(data, doc) {
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

  buildAppointment(data, doc) {
    var appointmentInfo: Appointment = {
      uid: doc.id,
      AppointmentClosed: data.AppointmentClosed,
      ContactNumber: data.ContactNumber,
      DoctorPrescription: data.DoctorPrescription,
      FeverPeaksIn: data.FeverPeaksIn,
      L1ExplainedMedicine: data.L1ExplainedMedicine,
      L1Reviewed: data.L1Reviewed,
      L2Reviewed: data.L2Reviewed,
      LockedBy: data.LockedBy,
      MailID: data.MailID,
      MucusColorTexture: data.MucusColorTexture,
      OXIMeterReading: data.OXIMeterReading,
      PatientID: data.PatientID,
      PatientName: data.PatientName,
      PeculiarSymptoms: data.PeculiarSymptoms,
      PulseRate: data.PulseRate,
      RegisteredBy: data.RegisteredBy,
      SleepSymptoms: data.SleepSymptoms,
      SymptomDate: data.SymptomDate,
      Symptoms: data.Symptoms,
      Temparature: data.Temparature
    };
    return appointmentInfo;
  }
}