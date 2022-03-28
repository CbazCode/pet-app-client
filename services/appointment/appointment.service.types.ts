// Appointment service interfaces and types

export interface Appointment {
  petId: string;
  petName: string;
  owner: string;
  date: string;
  veterinarianName: string;
  diagnosis: string;
  medications: string;
  bloodTest: string;
  xRay: string;
  _id?: string;
  __v?: number;
}
