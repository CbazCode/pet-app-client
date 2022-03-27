import { GetStaticProps } from "next";

// Components
import PetsHome from "../components/PetsHome/PetsHome";
// Services
import { fetchPets } from "../services/pet/pet.service";
// Types
import { Pet } from "../services/pet/pet.service.types";

interface Props {
  pets: Pet[];
}

const PetsHomePage: React.FC<Props> = props => {
  const { pets } = props;
  return (
    <div className="pets-home">
      <PetsHome pets={pets} />
    </div>
  );
};

export const getServerSideProps: GetStaticProps = async () => {
  let pets: Pet[] = [];
  try {
    const petsFetched = await fetchPets();
    pets = [...petsFetched];
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      pets: pets
    }
  };
};

export default PetsHomePage;
