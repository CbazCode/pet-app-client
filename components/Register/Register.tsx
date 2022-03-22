import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";

// Services
import { useRegisterUser } from "../../services/user/user.service.hooks";
// Types
import { RegisterValues } from "../../interfaces/user.interfaces";

export const Register = () => {
  const { mutate: registerUser } = useRegisterUser();

  const form = useForm<RegisterValues>({ mode: "onChange" });
  const { handleSubmit, register } = form;

  const onSubmit = (values: RegisterValues) => {
    console.log({ values });
    registerUser(values, {
      onSuccess: data => {
        console.log("succeed");
        console.log({ data });
      },
      onError: error => {
        console.log("error");
        console.log({ error });
      }
    });
  };

  return (
    <>
      <div>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel htmlFor="email">Name</FormLabel>
              <Input id="text" type="text" {...register("name")} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" {...register("email")} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Password</FormLabel>
              <Input id="password" type="password" {...register("password")} />
            </FormControl>
            <Button type="submit">Register</Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
