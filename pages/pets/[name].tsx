import { GetStaticProps } from "next";
import PetsDetails from "../../components/PetsDetails/PetsDetails";

// Services
import { fetchPet } from "../../services/pet/pet.service";

interface Props {
  pets: any[];
}

const PetsDetailsScreen: React.FC<Props> = props => {
  const { pets } = props;

  return <PetsDetails pets={pets} />;
};

export const getServerSideProps: GetStaticProps = async ctx => {
  const { params } = ctx;
  const { name } = params as { name: string };

  let pets: any[] = [];
  try {
    const petsFetched = await fetchPet(name);
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

export default PetsDetailsScreen;
