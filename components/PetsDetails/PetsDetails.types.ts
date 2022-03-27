// Interfaces and types from component PetsDetails

// Types
import { Pet } from "../../services/pet/pet.service.types";

// Component Props
export interface PetsDetailsProps {
  pets: Pet[];
}

// Styled Component Props
export interface PetsDetailsStyledProps {
  className: string;
}
