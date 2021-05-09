export interface Appointment {
    uid: string;
    PatientID: string;
    AppointmentClosed: string;
    ContactNumber: string;
    DoctorPrescription: string;
    FeverPeaksIn: string;
    

    ReviewStatus: string;
    LockedBy: boolean;

    //MailID: string;
    MucusColorTexture: string;
    OXIMeterReading: string;
    PatientName: string;
    PeculiarSymptoms: string;
    PulseRate: string;
    RegisteredBy: string;
    SleepSymptoms: string;
    SymptomDate: string;
    Symptoms: string;
    Temparature: string;
    
    BodyPains: boolean;
    BrethelessWeesing: boolean;
    ChestTightness: boolean;
    Cold: boolean;
    Cough: boolean;
    CoughtClipping: boolean;
    Diarrhoea: boolean;
    Drowsy: boolean;
    FeverWithChills: boolean;
    Nausea: boolean;
    Thirst: boolean;
    TieredRestless: boolean;
}