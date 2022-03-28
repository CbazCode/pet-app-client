import { Box, Button, FormControl } from "@chakra-ui/react";
import { NumberInput, NumberInputField } from "@chakra-ui/react";
import FileBase from "react-file-base64";
import { FormLabel, Input, Radio } from "@chakra-ui/react";
import { RadioGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Contexts
import useUser from "../../contexts/user/user.hooks";
// Utils
import { uploadImage } from "../../utils/global.utils";
// Services
import { useCreatePet } from "../../services/pet/pet.service.hooks";
// Types
import { PetToAddFormProps as Props } from "./PetToAddForm.types";
import useGlobal from "../../contexts/global/global.hooks";
import showToast from "../Toast/Toast";

const PetToAddForm: React.FC<Props> = props => {
  const { register, handleSubmit, reset } = useForm();
  const { mutate: createPet } = useCreatePet();
  // Component State
  const [value, setValue] = useState("M");
  const [fileSelected, setFileSelected] = useState<File>();
  const { authInfo } = useUser();
  const { setLoading } = useGlobal();

  const { token } = authInfo;

  const onSubmit = async (values: any) => {
    setLoading(true);
    const { dni, name, breed, birthday } = values;

    let urlUploaded = "";
    try {
      const { url } = await uploadImage(fileSelected);
      urlUploaded = url;
    } catch (error) {
      console.log(error);
    }

    const pet = {
      dni,
      name,
      breed,
      gender: value,
      birthday,
      file: urlUploaded
    };

    createPet(
      { pet, token },
      {
        onSuccess: data => {
          console.log({ data });
          console.log("pet created succed");
          reset();
          setLoading(false);
          showToast(
            "Accion exitosa",
            "La mascota se registro con exito",
            "success"
          );
        },
        onError: error => {
          console.log({ error });
          console.log("error");
          setLoading(false);
        }
      }
    );
  };

  return (
    <Box
      px="4"
      display="flex"
      height="100vh"
      width="100vw"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width="500px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="80%"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <Input id="name" type="text" {...register("name")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="breed">Raza</FormLabel>
            <Input id="breed" type="text" {...register("breed")} />
          </FormControl>
          <FormControl>
            <FormLabel>Genero</FormLabel>
            <RadioGroup onChange={setValue} value={value}>
              <Stack direction="row">
                <Radio value="M">Macho</Radio>
                <Radio value="F">Hembra</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>DNI</FormLabel>
            <RadioGroup onChange={setValue} value={value}>
              <NumberInput min={10000000} max={99999999}>
                <NumberInputField {...register("dni")} />
              </NumberInput>
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Fecha de nacimiento</FormLabel>
            <input type="date" {...register("birthday")} />
          </FormControl>
          <FormControl>
            <FormLabel>Foto de referencia</FormLabel>
            <input
              type="file"
              multiple={false}
              onChange={e => setFileSelected(e.target.files?.[0])}
            />
          </FormControl>
          <Button type="submit">Agregar</Button>
        </form>
      </Box>
    </Box>
  );
};

PetToAddForm.defaultProps = {};

export default PetToAddForm;
