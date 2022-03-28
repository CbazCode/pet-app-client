import { GetStaticProps } from "next";
import { fetchAppointments } from "../../../../services/appointment/appointment.service";
import { Appointment } from "../../../../services/appointment/appointment.service.types";

interface Props {
  appointments: Appointment[];
}

const PetAppointments: React.FC<Props> = props => {
  const { appointments } = props;
  console.log({ appointments });
  return (
    <>
      <p>Pet appointment</p>
    </>
  );
};

export const getServerSideProps: GetStaticProps = async ctx => {
  const { params } = ctx;
  const { petId } = params as { name: string; petId: string };
  let appointments: Appointment[] = [];
  try {
    const appointmentsFetched = await fetchAppointments(petId);
    appointments = [...appointmentsFetched];
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      appointments: appointments
    }
  };
};
export default PetAppointments;
