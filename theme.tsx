import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em"
});

const theme = extendTheme({
  colors: {
    primary: "#482F51",
    secondary: "#FBD76D",
    highlight: "#00C9A7",
    circleIcons: "#E1E9F0",
    letter: "#525252",
    danger: "#EF4444",
    warning: "#FCD34D",
    success: "#34D399",
    info: "#3B82F6"
  },
  fonts,
  breakpoints
});

export default theme;
