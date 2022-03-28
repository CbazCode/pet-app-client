// Interfaces and types from component Appointments

// Types
import { Appointment } from "../../services/appointment/appointment.service.types";

// Component Props
export interface AppointmentsProps {
  appointments: Appointment[];
}

// Styled Component Props
export interface AppointmentsStyledProps {
  className: string;
}
