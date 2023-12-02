import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

// Define your color palette
const colors = {
  primary: "#00e0e0", // Example primary color
  secondary: "#00999b", // Example secondary color
  tertiary: "#ffd6ff", // Example tertiary color
};

// Define custom font styles
const fonts = {
  heading: "Roboto, sans-serif",
  body: "Roboto, sans-serif",
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ colors, fonts, config });

export default theme;
