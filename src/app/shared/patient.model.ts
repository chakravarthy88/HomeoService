export interface Patient {
    uid: string;
    FirstName: string;
    LastName: string;
    Mobile: boolean;
    AltMobile: boolean;
    Age: number;
    Gender: string;
    TaggedDoctor: string;
    Address: string;
    TestedPositive: boolean;
    TestedDate: Date;
    Vaccinated: boolean;
 }