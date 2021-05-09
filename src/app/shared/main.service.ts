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
    return JSON.parse(localStorage.getItem('UserData'));
  }

  SavePatient(patient) {
    return this.afStore.collection('Patients').add(patient);
  }

  SaveAppointment(appoint) {
    return this.afStore.collection('Appointments').add(appoint);
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

  getL1Appointments() {
    console.log('loading-appoints');
    this.appoints = [];
    this.afStore
      .collection('Appointments', ref => ref.where("ReviewStatus", "==", "ReadyForReview"))
      .get()
      .subscribe(a => {
        a.forEach(aa =>
          this.appoints.push(this.buildAppointment(aa.data(), aa))
        )
      });
    console.log(this.appoints);
    return this.appoints;
  }

  getL2Appointments() {
    console.log('loading-appoints');
    this.appoints = [];

    this.afStore
      .collection('Appointments', ref => ref.where("ReviewStatus", "==", "L1ReviewCompleted"))
      .get()
      .subscribe(a => {
        a.forEach(aa =>
          this.appoints.push(this.buildAppointment(aa.data(), aa))
        )
      });
    console.log(this.appoints);
    return this.appoints;
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

  sendToDoctor(appointment, uid) {
    this.afStore.collection("Appointments").doc(uid).update({
      Symptoms: appointment.Symptoms,
      Temparature: appointment.Temparature,
      FeverPeaksIn: appointment.FeverPeaksIn,
      ReviewStatus: "L1ReviewCompleted",
      LockedBy:  "",
      MucusColorTexture: appointment.MucusColorTexture,
      OXIMeterReading: appointment.OXIMeterReading,
      PeculiarSymptoms: appointment.PeculiarSymptoms,
      PulseRate: appointment.PulseRate,
      SleepSymptoms: appointment.SleepSymptoms,
      BodyPains: appointment.BodyPains,
      BrethelessWeesing: appointment.BrethelessWeesing,
      ChestTightness: appointment.ChestTightness,
      Cold: appointment.Cold,
      Cough: appointment.Cough,
      CoughtClipping: appointment.CoughtClipping,
      Diarrhoea: appointment.Diarrhoea,
      Drowsy: appointment.Drowsy,
      FeverWithChills: appointment.FeverWithChills,
      Nausea: appointment.Nausea,
      Thirst: appointment.Thirst,
      TieredRestless: appointment.TieredRestless
    });
    this.router.navigate(['']);
  }

  tagDoctor(uid, name){
    this.afStore.collection("Patients").doc(uid).update({
      TaggedDoctor: name
    });
  }

  completeReview(appointment, uid) {
    this.afStore.collection("Appointments").doc(uid).update({
      Symptoms: appointment.Symptoms,
      Temparature: appointment.Temparature,
      FeverPeaksIn: appointment.FeverPeaksIn,
      ReviewStatus: "L2ReviewCompleted",
      LockedBy:  "",
      MucusColorTexture: appointment.MucusColorTexture,
      OXIMeterReading: appointment.OXIMeterReading,
      PeculiarSymptoms: appointment.PeculiarSymptoms,
      PulseRate: appointment.PulseRate,
      SleepSymptoms: appointment.SleepSymptoms,
      BodyPains: appointment.BodyPains,
      BrethelessWeesing: appointment.BrethelessWeesing,
      ChestTightness: appointment.ChestTightness,
      Cold: appointment.Cold,
      Cough: appointment.Cough,
      CoughtClipping: appointment.CoughtClipping,
      Diarrhoea: appointment.Diarrhoea,
      Drowsy: appointment.Drowsy,
      FeverWithChills: appointment.FeverWithChills,
      Nausea: appointment.Nausea,
      Thirst: appointment.Thirst,
      TieredRestless: appointment.TieredRestless
    });
    this.router.navigate(['']);
  }

  buildPatient(data, doc) {
    var patientInfo: Patient = {
      uid: doc.id,
      MailID: data.MailID,
      FirstName: data.FirstName,
      LastName: data.LastName,
      Mobile: data.Mobile,
      AltMobile: data.AltMobile,
      Age: data.Age,
      Gender: data.Gender,
      TaggedDoctor: data.TaggedDoctor
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
      ReviewStatus: data.ReviewStatus,
      LockedBy: data.LockedBy,
      //MailID: data.MailID,
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
      Temparature: data.Temparature,
      BodyPains: data.BodyPains,
      BrethelessWeesing: data.BrethelessWeesing,
      ChestTightness: data.ChestTightness,
      Cold: data.Cold,
      Cough: data.Cough,
      CoughtClipping: data.CoughtClipping,
      Diarrhoea: data.Diarrhoea,
      Drowsy: data.Drowsy,
      FeverWithChills: data.FeverWithChills,
      Nausea: data.Nausea,
      Thirst: data.Thirst,
      TieredRestless: data.TieredRestless
    };
    return appointmentInfo;
  }
}