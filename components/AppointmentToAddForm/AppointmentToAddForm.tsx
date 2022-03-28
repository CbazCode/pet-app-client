import { Box, Button, FormControl } from "@chakra-ui/react";
import { FormLabel, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Components
import showToast from "../Toast/Toast";
// Contexts
import useGlobal from "../../contexts/global/global.hooks";
import useUser from "../../contexts/user/user.hooks";
// Utils
import { uploadImage } from "../../utils/global.utils";
// Services
import { useCreateAppointment } from "../../services/appointment/appointment.service.hooks";
// Types
import { AppointmentToAddForm as Props } from "./AppointmentToAddForm.types";

const AppointmentToAddForm: React.FC<Props> = props => {
  const { handleSubmit, register } = useForm();
  const { query } = useRouter();
  const { mutate: createAppointment } = useCreateAppointment();
  const { name, petId } = query;

  const [fileSelected, setFileSelected] = useState<File>();
  const { authInfo } = useUser();
  const { setLoading } = useGlobal();

  const { token } = authInfo;

  const onSubmit = async (values: any) => {
    setLoading(true);
    const { date, veterinarianName, diagnosis } = values;
    const { medications, bloodTest } = values;

    let urlUploaded = "";

    try {
      const { url } = await uploadImage(fileSelected);
      urlUploaded = url;
    } catch (error) {
      console.log({ error });
    }
    const appointment = {
      petId,
      petName: name,
      bloodTest,
      date,
      veterinarianName,
      diagnosis,
      medications,
      xRay: urlUploaded
    };

    createAppointment(
      { appointment, token },
      {
        onSuccess: data => {
          console.log("succed");
          setLoading(false);
          showToast(
            "Accion exitosa",
            "La cita se registro con exito",
            "success"
          );
        },
        onError: error => {
          console.log({ error });
          setLoading(false);
        }
      }
    );
  };

  return (
    <Box className="AppointmentToAddForm">
      <Box
        px="4"
        display="flex"
        height="100vh"
        width="100vw"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Text fontSize="32" fontWeight="bold" py="8">
          Es momento de registrar la cita
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor="veterinarianName">
              Nombre del veterinario
            </FormLabel>
            <Input id="name" type="text" {...register("veterinarianName")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="bloodTest">Test de sangre</FormLabel>
            <Input id="bloodTest" type="text" {...register("bloodTest")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="diagnosis">Diagnostico</FormLabel>
            <Input id="diagnosis" type="text" {...register("diagnosis")} />
          </FormControl>
          <FormControl>
            <FormLabel>Fecha de la cita</FormLabel>
            <input type="date" {...register("date")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="medications">Medicamentos</FormLabel>
            <Input id="medications" type="text" {...register("medications")} />
          </FormControl>
          <FormControl>
            <FormLabel>Foto de rayos X</FormLabel>
            <input
              type="file"
              multiple={false}
              onChange={e => setFileSelected(e.target.files?.[0])}
            />
          </FormControl>
          <Button type="submit">Guardar cita</Button>
        </form>
      </Box>
    </Box>
  );
};

AppointmentToAddForm.defaultProps = {};

export default AppointmentToAddForm;
