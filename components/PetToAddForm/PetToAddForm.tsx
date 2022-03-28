import { Box, Button, Flex, FormControl, Text } from "@chakra-ui/react";
import { NumberInput, NumberInputField } from "@chakra-ui/react";
import { FormLabel, Input, Radio } from "@chakra-ui/react";
import { RadioGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Components
import showToast from "../Toast/Toast";
// Contexts
import useUser from "../../contexts/user/user.hooks";
import useGlobal from "../../contexts/global/global.hooks";
// Utils
import { uploadImage } from "../../utils/global.utils";
// Services
import { useCreatePet } from "../../services/pet/pet.service.hooks";
// Types
import { PetToAddFormProps as Props } from "./PetToAddForm.types";
import styles from "../../styles/Common.module.css";

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
      justifyContent="center"
      alignItems="center"
      height="100%"
      my="10"
    >
      <Box
        width="50%"
        display="flex"
        flexDirection="column"
        bgColor="secondary"
        padding="4"
        borderRadius="20"
        pb="8"
        px="8"
      >
        <Flex justifyContent="space-between" py="4">
          <Text fontSize={24} fontWeight="semibold">
            Agrega a nuestro amigo de cuatro patas
          </Text>
          <i className="fa-solid fa-paw" style={{ fontSize: "32px" }}></i>
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl py="4">
            <FormLabel htmlFor="name">Nombre</FormLabel>
            <Input
              id="name"
              type="text"
              {...register("name")}
              bgColor="white"
            />
          </FormControl>
          <FormControl py="4">
            <FormLabel htmlFor="breed">Raza</FormLabel>
            <Input
              id="breed"
              type="text"
              {...register("breed")}
              bgColor="white"
            />
          </FormControl>
          <FormControl py="4">
            <FormLabel>Genero</FormLabel>
            <RadioGroup onChange={setValue} value={value}>
              <Stack direction="row" spacing={10} pt="2">
                <Radio value="M" bgColor="white">
                  Macho
                </Radio>
                <Radio value="F" bgColor="white">
                  Hembra
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl py="4">
            <FormLabel>DNI</FormLabel>
            <NumberInput min={10000000} max={99999999}>
              <NumberInputField {...register("dni")} bgColor="white" />
            </NumberInput>
          </FormControl>
          <FormControl py="4">
            <FormLabel>Fecha de nacimiento</FormLabel>
            <input
              type="date"
              {...register("birthday")}
              style={{
                width: "100%",
                borderRadius: "8px",
                padding: "8px",
                border: "solid 1px #e2e4e7"
              }}
            />
          </FormControl>
          <FormControl py="4">
            <FormLabel>Foto de referencia</FormLabel>
            <input
              type="file"
              multiple={false}
              onChange={e => setFileSelected(e.target.files?.[0])}
            />
          </FormControl>
          <Button type="submit" width="100%" colorScheme="purple" mt="4">
            Agregar
          </Button>
        </form>
      </Box>
    </Box>
  );
};

PetToAddForm.defaultProps = {};

export default PetToAddForm;
