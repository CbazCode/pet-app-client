import React from "react";

import { PetsDetailsProps as Props } from "./PetsDetails.types";

const PetsDetails: React.FC<Props> = props => {
  const { pets } = props;
  return (
    <>
      {pets && pets.length > 0 ? (
        <>
          {pets.map((pet, index) => {
            const { name, breed, gender, _id } = pet;
            const { birthday, file, dni } = pet;
            return (
              <div key={_id}>
                <p>{name}</p>
                <p>{dni}</p>
                <p>{breed}</p>
                <p>{gender}</p>
                <p>{birthday}</p>
                <img src={file} />
              </div>
            );
          })}
        </>
      ) : (
        <p>No hay perros</p>
      )}
    </>
  );
};

PetsDetails.defaultProps = {};

export default PetsDetails;
