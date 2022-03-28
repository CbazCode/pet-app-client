import { Box, CircularProgress } from "@chakra-ui/react";
import React from "react";

import { LoadingProps as Props } from "./Loading.types";

const Loading: React.FC<Props> = props => {
  return (
    <Box
      position="absolute"
      opacity={0.8}
      top="0"
      zIndex={9999}
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor="circleIcons"
    >
      <CircularProgress isIndeterminate color="primary" size="36" />
    </Box>
  );
};

Loading.defaultProps = {};

export default Loading;
