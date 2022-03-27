import { Box, Button, FormControl, Grid, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";

// Components
import PetCard from "../PetCard/PetCard";
// Types
import { PetHomeProps as Props } from "./PetsHome.types";

const PetsHome: React.FC<Props> = props => {
  const { pets } = props;
  const searcherFormMethods = useForm();
  const router = useRouter();
  const { handleSubmit, register } = searcherFormMethods;

  const onSubmit = (values: any) => {
    router.push(`pets/${values.searcher}`);
  };

  return (
    <Box px="8">
      <Text py="3" fontWeight="semibold">
        Encuentra a tu mascota
      </Text>
      <FormProvider {...searcherFormMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" paddingBottom="30">
            <FormControl>
              <Input id="searcher" type="text" {...register("searcher")} />
            </FormControl>
            <Button type="submit" outline="none">
              Buscar
            </Button>
          </Box>
        </form>
      </FormProvider>
      <Link href="/pets/add">
        <a>
          <Button width="100%" marginBottom="30">
            Agregar a un amingo canino
          </Button>
        </a>
      </Link>
      {pets && pets.length > 0 ? (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)"
          }}
          alignItems="center"
          justifyContent="center"
          gridColumnGap="10"
        >
          {pets.map(pet => {
            const { _id } = pet;

            return <PetCard key={_id} pet={pet} />;
          })}
        </Grid>
      ) : (
        <p>No hay mascotas</p>
      )}
    </Box>
  );
};

export default PetsHome;
