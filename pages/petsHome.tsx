import { GetStaticProps } from "next";

// Components
import PetsHome from "../components/PetsHome/PetsHome";
// Services
import { fetchPets } from "../services/pet/pet.service";

const PetsHomePage = (props: any) => {
  const { pets } = props;
  return (
    <div className="pets-home">
      <PetsHome pets={pets} />
    </div>
  );
};

export const getServerSideProps: GetStaticProps = async () => {
  let pets: any[] = [];
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
