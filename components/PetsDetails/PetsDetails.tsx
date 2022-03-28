import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { format } from "date-fns";
import { useRouter } from "next/router";

// Utils
import { toCapitalizeString } from "../../utils/global.utils";
// Types, styles
import { PetsDetailsProps as Props } from "./PetsDetails.types";
import styles from "../../styles/Common.module.css";

const PetsDetails: React.FC<Props> = props => {
  const { pets } = props;

  const router = useRouter();

  return (
    <>
      {pets && pets.length > 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Flex alignItems="center">
            <Button
              colorScheme="blackAlpha"
              my="10"
              mx="10"
              onClick={() => router.push("/petsHome")}
            >
              Volver
            </Button>
            <Text fontSize="36" fontWeight="bold" py="10">
              Conoceme mas
            </Text>
          </Flex>
          {pets.map((pet, index) => {
            const { name, breed, gender, _id } = pet;
            const { birthday, file, dni } = pet;

            const birthdayFormatted = format(new Date(birthday), "dd-MM-yyyy");
            return (
              <Box
                key={_id}
                display="flex"
                height="80vh"
                alignItems="center"
                justifyContent="center"
                backgroundColor="secondary"
                borderRadius="10"
                shadow="lg"
              >
                <Flex height="100%" width="500">
                  <Image
                    src={file}
                    width={500}
                    height={1000}
                    objectFit="cover"
                    className={styles.petDetailImage}
                  />
                </Flex>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  height="100%"
                  px="10"
                  py="8"
                >
                  <Box display="flex" alignItems="center">
                    <i
                      className="fa-solid fa-paw"
                      style={{ fontSize: "42px" }}
                    ></i>
                    <Text px="3" fontWeight="semibold" fontSize="20">
                      Nombre:
                    </Text>
                    <Text fontSize="20">{toCapitalizeString(name)}</Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <i
                      className="fa-solid fa-address-card"
                      style={{ fontSize: "42px" }}
                    ></i>
                    <Text px="3" fontWeight="semibold" fontSize="20">
                      DNI:
                    </Text>
                    <Text fontSize="20">{dni}</Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <i
                      className="fa-solid fa-shield-dog"
                      style={{ fontSize: "42px" }}
                    ></i>
                    <Text px="3" fontWeight="semibold" fontSize="20">
                      Raza:
                    </Text>
                    <Text fontSize="20">{toCapitalizeString(breed)}</Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <i
                      className="fa-solid fa-mars-and-venus"
                      style={{ fontSize: "42px" }}
                    ></i>
                    <Text px="3" fontWeight="semibold" fontSize="20">
                      Genero:
                    </Text>
                    <Text fontSize="20">{toCapitalizeString(gender)}</Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <i
                      className="fa-solid fa-cake-candles"
                      style={{ fontSize: "42px" }}
                    ></i>
                    <Text px="3" fontWeight="semibold" fontSize="20">
                      Cumpleaños:
                    </Text>
                    <Text fontSize="20">{birthdayFormatted}</Text>
                  </Box>
                  <Flex>
                    <Button
                      colorScheme="linkedin"
                      mr="2"
                      onClick={() =>
                        router.push(`/pets/${name}/${_id}/addAppointment`)
                      }
                    >
                      Registrar cita
                    </Button>
                    <Button
                      colorScheme="teal"
                      onClick={() => router.push(`/pets/${name}/${_id}`)}
                    >
                      Ver historial de citas
                    </Button>
                  </Flex>
                </Box>
              </Box>
            );
          })}
        </Box>
      ) : (
        <p>No hay perros</p>
      )}
    </>
  );
};

PetsDetails.defaultProps = {};

export default PetsDetails;
