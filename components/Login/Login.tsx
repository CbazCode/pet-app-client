import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";

export const Login = () => {
  const form = useForm({ mode: "onChange" });
  const { handleSubmit, register } = form;

  const onSubmit = (values: any) => {
    console.log({ values });
  };

  return (
    <>
      <div>
        <FormProvider {...form}>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" {...register("email")} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Password</FormLabel>
            <Input id="password" type="password" {...register("password")} />
          </FormControl>
        </FormProvider>
        <Button onClick={() => handleSubmit(onSubmit)}>Log In</Button>
      </div>
    </>
  );
};
