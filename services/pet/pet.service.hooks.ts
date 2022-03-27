import { useQuery } from "react-query";

import { fetchPets } from "./pet.service";

export const useFetchPets = () => {
  return useQuery(["pets"], () => fetchPets(), {
    enabled: true
  });
};
