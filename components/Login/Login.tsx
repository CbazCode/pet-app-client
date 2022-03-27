import { useEffect } from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
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
      <div>
        <h1>Login</h1>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" {...register("email")} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Password</FormLabel>
              <Input id="password" type="password" {...register("password")} />
            </FormControl>
            <Button type="submit">Log In</Button>
          </form>
        </FormProvider>
        <Link href="/register">
          <a>Ya tienes cuenta?</a>
        </Link>
      </div>
    </>
  );
};
