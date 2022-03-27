import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import Image from "next/image";

// Types
import { PetCardProps as Props } from "./PetCard.types";
import styles from "../../styles/Common.module.css";
import { format } from "date-fns";

const PetCard: React.FC<Props> = props => {
  const { pet } = props;
  const { name, breed, gender } = pet;
  const { birthday, file, dni } = pet;
  const birthdayFormatted = format(new Date(birthday), "dd-MM-yyy");
  return (
    <Link href={`/pets/${name}`}>
      <a>
        <Box
          mx="2"
          display="flex"
          flexDirection="column"
          border="1px"
          borderColor="circleIcons"
          width="100%"
          borderRadius="xl"
          shadow="lg"
          marginBottom="8"
        >
          <Image
            src={file}
            className={styles.petImage}
            width={250}
            height={250}
          />
          <Box
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            px="4"
            py="2"
            paddingTop="3"
            backgroundColor="circleIcons"
            borderBottomRadius="xl"
          >
            <Text
              py="1"
              mb="2"
              backgroundColor="info"
              color="white"
              width="min-content"
              px="2"
              borderRadius="xl"
              fontSize="14"
            >
              {breed}
            </Text>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              py="1"
            >
              <Box display="flex" alignItems="center" width="55%">
                <i className="fa-solid fa-paw"></i>
                <Text px="2" height="min-content" fontSize="16">
                  {name}
                </Text>
              </Box>
              <Box display="flex" alignItems="center" width="40%">
                <i className="fa-solid fa-mars-and-venus"></i>
                <Text px="2" height="min-content" fontSize="16">
                  {gender}
                </Text>
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              py="1"
            >
              <Box display="flex" alignItems="center" width="55%">
                <i className="fa-solid fa-cake-candles"></i>
                <Text px="2" height="min-content" fontSize="16">
                  {birthdayFormatted}
                </Text>
              </Box>
              <Box display="flex" alignItems="center" width="40%">
                <i className="fa-solid fa-address-card"></i>
                <Text px="2" height="min-content" fontSize="16">
                  {dni}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </a>
    </Link>
  );
};

PetCard.defaultProps = {};

export default PetCard;
