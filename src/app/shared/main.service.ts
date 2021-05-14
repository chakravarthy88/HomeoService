import { DebugElement, Injectable, NgZone } from '@angular/core';
import { loadingController, toastController } from '@ionic/core';
import { firebase } from 'firebase/firebase-auth'
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Patient } from './patient.model';
import { Appointment } from './appointment.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MainService {
  patientData: AngularFireObject<any>;
  user: any;
  patientInfo: Patient;
  public patients: any[] = [];
  public appoints: any[] = [];
  public apptSubscriber: Subscription;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private db: AngularFireDatabase
  ) {
    // if(uData == null || uData.userInDB == undefined)
    // {
    //   console.log('wrong-login')
    //   this.router.navigate(['login']);
    // }
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('UserData'));
  }

  getUserUID() {
    return this.getUserData().userInDB.uid;
  }

  getUserRole() {
    return this.getUserData().userInDB.role;
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
          this.patients.push(this.buildPatientWithDoc(aa.data(), aa))
        )
      });
    //console.log(this.patients);
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
          this.appoints.push(this.buildAppointmentWithDoc(aa.data(), aa))
        )
      });
    //console.log(this.appoints);
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
          this.appoints.push(this.buildAppointmentWithDoc(aa.data(), aa))
        )
      });
    console.log(this.appoints);
    return this.appoints;
  }

  getPatientById(uid) {
    return this.afStore
      .collection('Patients')
      .doc(uid)
      .get();
  }

  getAppointmentId(uid) {
    return this.afStore
      .collection('Appointments')
      .doc(uid)
      .get();
  }

  UnLockAllMyCases(uid) {
    var appoinments = [];
    this.apptSubscriber = this.afStore.collection("Appointments", ref => ref.where("LockedBy", "==", uid))
      .get()
      .subscribe(a => {
        a.forEach(aa => this.appoints.push(aa))
      });
    this.apptSubscriber.unsubscribe();
    this.showToastMessage("Unlock all patients successfull");
    this.router.navigate(['tabs']);
  }

  LockAppointment(apptUID, userID) {
    this.afStore.collection("Appointments").doc(apptUID).update({
      LockedBy: userID
    })
  }

  UnLockAppointment(appt) {
    this.afStore.collection("Appointments").doc(appt.uid).update({
      LockedBy: ""
    })
  }

  sendToDoctor(appointment, uid) {
    this.afStore.collection("Appointments").doc(uid).update({
      Symptoms: appointment.Symptoms,
      Temparature: appointment.Temparature,
      FeverPeaksIn: appointment.FeverPeaksIn,
      ReviewStatus: "L1ReviewCompleted",
      LockedBy: "",
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

  tagDoctor(uid, name) {
    this.afStore.collection("Patients").doc(uid).update({
      TaggedDoctor: name
    });
  }

  completeReview(appointment, uid) {
    this.afStore.collection("Appointments").doc(uid).update({
      Symptoms: appointment.Symptoms,
      Temparature: appointment.Temparature,
      FeverPeaksIn: appointment.FeverPeaksIn,
      ReviewStatus: "DrReviewCompleted",
      LockedBy: "",
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
    this.showToastMessage("Review completed");
    this.router.navigate(['']);
  }
  
  buildPatientWithDoc(data, doc) {
    return this.buildPatient(data, doc.id);
  }

  buildPatient(data, uid) {
    var patientInfo: Patient = {
      uid: uid,
      FirstName: data.FirstName,
      LastName: data.LastName,
      Mobile: data.Mobile,
      AltMobile: data.AltMobile,
      Age: data.Age,
      Address: data.Address,
      Gender: data.Gender,
      TaggedDoctor: data.TaggedDoctor
    };
    return patientInfo;
  }

  buildAppointmentWithDoc(data, doc) {
    return this.buildAppointment(data, doc.id);
  }
  buildAppointment(data, uid) {
    var appointmentInfo: Appointment = {
      uid: uid,
      AppointmentClosed: data.AppointmentClosed,
      ContactNumber: data.ContactNumber,
      DoctorPrescription: data.DoctorPrescription,
      FeverPeaksIn: data.FeverPeaksIn,
      ReviewStatus: data.ReviewStatus,
      ReviewStatusColor: this.getStatusColor(data.ReviewStatus),
      LockedBy: data.LockedBy,
      IsAcquirable: data.LockedBy == '' || data.LockedBy == this.getUserUID(),
      MucusColorTexture: data.MucusColorTexture,
      OXIMeterReading: data.OXIMeterReading,
      PatientID: data.PatientID,
      PatientName: data.PatientName,
      PeculiarSymptoms: data.PeculiarSymptoms,
      PulseRate: data.PulseRate,
      RegisteredBy: data.RegisteredBy,
      SleepSymptoms: data.SleepSymptoms,
      SymptomDate: new Date(data.SymptomDate * 1000),//data.SymptomDate,
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
      TieredRestless: data.TieredRestless,
      PatientInfo: this.buildPatient(data.PatientInfo, uid)
    };
    return appointmentInfo;
  }

  getPatientAllAppointments(PatientID) {
    console.log('loading-PatientAllAppointments', PatientID);
    this.appoints = [];
    this.afStore
      .collection('Appointments', ref => ref.where("PatientID", "==", PatientID))
      .get()
      .subscribe(a => {
        a.forEach(aa =>
          this.appoints.push(this.buildAppointmentWithDoc(aa.data(), aa))
        )
      });
    console.log(this.appoints);
    return this.appoints;
  }

  getStatusColor (status) {
    switch (status) {
      case 'ReadyForReview': return 'danger'; break; //red
      case 'L1ReviewCompleted': return 'warning'; break; //yellow/orange
      case 'DrReviewCompleted': return 'success'; break; //green
      default: return 'primary'; //blue
    }
  }

  async showToastMessage(message) {
    const toast = await toastController.create({
      color: 'dark',
      duration: 3000,
      message: message
    });
    await toast.present();
  }

  async showLoadingSpinner() {
    const loading = await loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });

    await loading.present();
  }
}