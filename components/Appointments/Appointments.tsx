import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";

/// Utils
import { toCapitalizeString } from "../../utils/global.utils";
// Types
import { AppointmentsProps as Props } from "./Appointments.types";

const Appointments: React.FC<Props> = props => {
  const { appointments } = props;

  const { query } = useRouter();
  const { name = "" } = query;
  return (
    <Box px="16px" py="20px">
      <Text fontWeight="semibold" fontSize="32">
        Estas son las citas de: {toCapitalizeString(name as string)}
      </Text>
      <Table size="md" variant="striped" colorScheme="purple" mt="16px">
        <Thead backgroundColor="primary">
          <Tr>
            <Th color="white" fontSize="16px">
              Fecha de la cita
            </Th>
            <Th color="white" fontSize="16px">
              Test de sangre
            </Th>
            <Th color="white" fontSize="16px">
              Medicamentos
            </Th>
            <Th color="white" fontSize="16px">
              Diagnostico
            </Th>

            <Th color="white" fontSize="16px">
              Nombre del veterinario
            </Th>
            <Th color="white" fontSize="16px">
              Rayos X
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {appointments.map((item, index) => {
            const { date, bloodTest, medications } = item;
            const { diagnosis, veterinarianName, xRay } = item;

            const dateFormatted = format(new Date(date), "dd-MM-yyyy");
            return (
              <Tr key={index}>
                <Td fontSize="18px">{dateFormatted}</Td>
                <Td fontSize="18px">{toCapitalizeString(bloodTest)}</Td>
                <Td fontSize="18px">{toCapitalizeString(medications)}</Td>
                <Td fontSize="18px">{toCapitalizeString(diagnosis)}</Td>
                <Td fontSize="18px">{toCapitalizeString(veterinarianName)}</Td>
                <Td fontSize="14px">
                  <Image
                    src={xRay}
                    width={70}
                    height={70}
                    className="imageTable"
                    objectFit="cover"
                  />
                  <style jsx global>{`
                    .imageTable {
                      border-radius: 100px;
                    }
                  `}</style>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

Appointments.defaultProps = {};

export default Appointments;
