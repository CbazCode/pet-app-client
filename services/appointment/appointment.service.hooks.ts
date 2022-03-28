import { useMutation } from "react-query";

import { createAppointment } from "./appointment.service";

export const useCreateAppointment = () => {
  return useMutation((petAndToken: any) => createAppointment(petAndToken));
};
