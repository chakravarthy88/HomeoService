import { Component, OnInit } from '@angular/core';
import { MainService } from "../shared/main.service";
import { Router, ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.page.html',
  styleUrls: ['./new-appointment.page.scss'],
})
export class NewAppointmentPage implements OnInit {

  public appointment: any = {};
  public uid: any;
  public patientInfo: any = {};
  public isPatient: boolean = false;
  public savePatientSubscription: any;
  public Symptoms: boolean = true;
  public Temparature: boolean = true;
  public FeverPeaksIn: boolean = true;
  public MucusColorTexture: boolean = true;
  public PulseRate: boolean = true;
  public PeculiarSymptoms: boolean = true;
  public SleepSymptoms: boolean = true;
  public OXIMeterReading: boolean = true;
  public isSubmitted: boolean = false;

  constructor(private service: MainService, private router: Router, private aRouter: ActivatedRoute) {
    this.appointment.BodyPains = false;
    this.appointment.BrethelessWeesing = false;
    this.appointment.ChestTightness = false;
    this.appointment.Cold = false;
    this.appointment.Cough = false;
    this.appointment.CoughtClipping = false;
    this.appointment.Diarrhoea = false;
    this.appointment.Drowsy = false;
    this.appointment.FeverWithChills = false;
    this.appointment.Nausea = false;
    this.appointment.Thirst = false;
    this.appointment.TieredRestless = false;
  }

  ngOnInit() {
    this.uid = this.aRouter.snapshot.paramMap.get('uid');
    this.isPatient = this.service.getUserRole() == null || this.service.getUserRole() == undefined || this.service.getUserRole() == 1;
    this.savePatientSubscription = this.getPatientById(this.aRouter.snapshot.paramMap.get('uid'));
    this.savePatientSubscription.subscribe(res => {
      this.patientInfo = res;
    });
  }

  getPatientById(uid)
  {
    return this.service.getPatientById(uid);
  }

  checkValidation(){
    console.log(this.appointment);
    this.Symptoms = (this.appointment.Symptoms != undefined && this.appointment.Symptoms.length > 0);
    this.Temparature = (this.appointment.Temparature != undefined && this.appointment.Temparature.length > 0)
    this.FeverPeaksIn = (this.appointment.FeverPeaksIn != undefined && this.appointment.FeverPeaksIn.length > 0)
    this.MucusColorTexture = (this.appointment.MucusColorTexture != undefined && this.appointment.MucusColorTexture.length > 0)
    this.PulseRate = (this.appointment.PulseRate != undefined && this.appointment.PulseRate.length > 0)
    this.PeculiarSymptoms = (this.appointment.PeculiarSymptoms != undefined && this.appointment.PeculiarSymptoms.length > 0)
    this.SleepSymptoms = (this.appointment.SleepSymptoms != undefined && this.appointment.SleepSymptoms.length > 0)
    this.OXIMeterReading = (this.appointment.OXIMeterReading != undefined && this.appointment.OXIMeterReading.length > 0)

    console.log(this.appointment);
    return (this.Symptoms && this.Temparature && this.FeverPeaksIn && this.MucusColorTexture && this.PulseRate && this.PeculiarSymptoms
      && this.SleepSymptoms && this.OXIMeterReading);
  }

  SaveAppointment(){
    this.isSubmitted = true;
    if(this.checkValidation())
    {
    console.log(this.appointment);
    this.service.showLoadingSpinner();
    var userData = JSON.parse(localStorage.getItem('UserData'));
    this.appointment.ReviewStatus = "ReadyForReview";
    this.appointment.LockedBy = "";
    this.appointment.AppointmentClosed = false;
    this.appointment.PatientID = this.uid;
    this.appointment.PatientName = this.patientInfo.FirstName + ", " + this.patientInfo.LastName;
    this.appointment.PatientInfo = this.patientInfo;
    this.appointment.SymptomDate  = new Date();
    this.appointment.L1Reviewed = false;
    this.appointment.L1ExplainedMedicine = false;
    this.appointment.L2Reviewed = false;
    this.appointment.DoctorPrescription = "";
    this.appointment.RegisteredBy = userData.uid;

    this.service.SaveAppointment(this.appointment);
    this.service.showToastMessage("Appointment Saved and sent for review !!");
    this.appointment = {};
    this.router.navigate(['tabs']);
  }
  else
  {
     return false;
  }    
  }

  goToHome(){
    this.router.navigate(['tabs']);
  }
}
