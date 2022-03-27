import { useMutation, useQuery } from "react-query";

// Services
import { createPet, fetchPets } from "./pet.service";
// Types
import { Pet } from "./pet.service.types";

export const useFetchPets = () => {
  return useQuery(["pets"], () => fetchPets(), {
    enabled: true
  });
};

export const useCreatePet = () => {
  return useMutation((petAndToken: any) => createPet(petAndToken));
};
