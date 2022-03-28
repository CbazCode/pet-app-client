import { Box, Flex, FormControl } from "@chakra-ui/react";
import { FormLabel, Input, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";

// Services
import { useRegisterUser } from "../../services/user/user.service.hooks";
// Types
import { RegisterValues } from "../../interfaces/user.interfaces";

export const Register = () => {
  const { mutate: registerUser } = useRegisterUser();

  const form = useForm<RegisterValues>({ mode: "onChange" });
  const { handleSubmit, register } = form;

  const router = useRouter();

  const onSubmit = (values: RegisterValues) => {
    registerUser(values, {
      onSuccess: data => {
        router.push("/");
        console.log("succeed");
      },
      onError: error => {
        console.log("error");
      }
    });
  };

  return (
    <>
      <Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          bgColor="whatsapp.800"
          width="full"
        >
          <Box>
            <Text fontSize={40} fontWeight="semibold" color="white">
              Registro
            </Text>
            <FormProvider {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl my="2">
                  <FormLabel htmlFor="email" fontSize={20} color="white">
                    Nombre
                  </FormLabel>
                  <Input
                    id="text"
                    type="text"
                    {...register("name")}
                    bgColor="white"
                  />
                </FormControl>
                <FormControl my="2">
                  <FormLabel htmlFor="email" fontSize={20} color="white">
                    Email
                  </FormLabel>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    bgColor="white"
                  />
                </FormControl>
                <FormControl my="2">
                  <FormLabel htmlFor="email" fontSize={20} color="white">
                    Password
                  </FormLabel>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    bgColor="white"
                  />
                </FormControl>
                <Button
                  type="submit"
                  width="100%"
                  my="4"
                  colorScheme="whatsapp"
                >
                  Registrarse
                </Button>
              </form>
            </FormProvider>
            <Link href="/">
              <a style={{ color: "white" }}>Inicia sesion</a>
            </Link>
          </Box>
        </Flex>
        <img
          src="http://c.files.bbci.co.uk/48DD/production/_107435681_perro1.jpg"
          alt="perro"
          style={{ objectFit: "cover", width: "80%", height: "100vh" }}
        />
      </Flex>
    </>
  );
};
