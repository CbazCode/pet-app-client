import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { PetHomeProps as Props } from "./PetsHome.types";

const PetsHome: React.FC<Props> = props => {
  const { pets } = props;
  const searcherFormMethods = useForm();
  const router = useRouter();
  const { handleSubmit, register } = searcherFormMethods;

  const onSubmit = (values: any) => {
    console.log({ values });
    router.push(`pets/${values.searcher}`);
  };

  return (
    <div className="pets-home">
      <FormProvider {...searcherFormMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor="searcher">Encuentra a tu mascota</FormLabel>
            <Input id="searcher" type="text" {...register("searcher")} />
          </FormControl>
          <Button type="submit">Buscar</Button>
        </form>
      </FormProvider>
      {pets && pets.length > 0 ? (
        <>
          {pets.map((pet: any) => {
            const { name, breed, gender, _id } = pet;
            const { birthday, file, dni } = pet;
            return (
              <div key={_id}>
                <p>{name}</p>
                <p>{dni}</p>
                <p>{breed}</p>
                <p>{gender}</p>
                <p>{birthday}</p>
                <img src={file} />
              </div>
            );
          })}
        </>
      ) : (
        <p>No hay mascotas</p>
      )}
    </div>
  );
};

export default PetsHome;
