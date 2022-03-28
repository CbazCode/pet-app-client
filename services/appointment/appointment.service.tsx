// Appointment services

// Utils
import axios from "../../utils/axios.utils";
// Types
import { Appointment } from "./appointment.service.types";

const baseUrl = "/appointments";

export const fetchAppointments = async (
  petId: string
): Promise<Appointment[]> => {
  try {
    const { data } = await axios.get(`${baseUrl}/${petId}`);
    return data.result;
  } catch (error: any) {
    const { response } = error;
    const { data } = response;
    const { error: serverError } = data;
    throw new Error(serverError.message);
  }
};

export const createAppointment = async (appointmentAndToken: any) => {
  const { appointment, token } = appointmentAndToken;
  console.log({ appointment, token });
  try {
    const { data } = await axios.post(`${baseUrl}`, appointment, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return data;
  } catch (error: any) {
    const { response } = error;
    const { data } = response;
    const { error: serverError } = data;
    throw new Error(serverError.message);
  }
};
