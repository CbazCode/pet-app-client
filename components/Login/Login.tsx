import { useEffect } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";

// Contexts
import useUser from "../../contexts/user/user.hooks";
import useGlobal from "../../contexts/global/global.hooks";
// Helpers
import { createAuthInfoPayload } from "./Login.helpers";
// Services
import { useLoginUser } from "../../services/user/user.service.hooks";
// Types
import { LoginValues } from "../../interfaces/user.interfaces";

export const Login = () => {
  const router = useRouter();

  const form = useForm<LoginValues>({ mode: "onChange" });
  const { mutate: loginUser, isLoading } = useLoginUser();

  const { setAuthInfo } = useUser();
  const { setLoading } = useGlobal();

  const { handleSubmit, register } = form;

  const onSubmit = (values: LoginValues) => {
    loginUser(values, {
      onSuccess: data => {
        const authInfo = createAuthInfoPayload(data);
        setAuthInfo(authInfo);
        localStorage.setItem("authInfo", JSON.stringify(authInfo));
        router.push("/petsHome");
      },
      onError: error => {
        console.log("error");
      }
    });
  };

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <>
      <Flex>
        <img
          src="https://www.nationalgeographic.com.es/medio/2022/01/02/los-perros-son-capaces-de-anticipar-cuando-estamos-a-punto-de-volver-a-casa_4f6f27aa_1280x853.jpg"
          alt="perro"
          style={{ objectFit: "cover", width: "80%", height: "100vh" }}
        />
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          bgColor="twitter.300"
          width="25%"
        >
          <Box>
            <Text fontSize={40} fontWeight="semibold">
              Iniciar Sesion
            </Text>
            <FormProvider {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl my="2">
                  <FormLabel htmlFor="email" fontSize={20}>
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
                  <FormLabel htmlFor="email" fontSize={20}>
                    Password
                  </FormLabel>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    bgColor="white"
                  />
                </FormControl>
                <Button type="submit" width="100%" my="4" colorScheme="purple">
                  Log In
                </Button>
              </form>
            </FormProvider>
            <Link href="/register">
              <a>Ya tienes cuenta?</a>
            </Link>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
