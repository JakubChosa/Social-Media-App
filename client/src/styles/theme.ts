import { DefaultTheme } from "styled-components";

const colorTokens = {
  grey: {
    0: "#FFFFFF",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0d0d0d",
    1000: "#000000",
  },
  primary: {
    100: "#CCF7FE",
    200: "#99EEFD",
    500: "#00D5FA",
    800: "#00353F",
  },
};

export const darkTheme: DefaultTheme = {
  primary: {
    dark: colorTokens.primary[200],
    main: colorTokens.primary[500],
    light: colorTokens.primary[800],
  },
  neutral: {
    dark: colorTokens.grey[100],
    main: colorTokens.grey[200],
    light: colorTokens.grey[900],
  },
  text: colorTokens.grey[0],
  background: colorTokens.grey[800],
};

export const lightTheme: DefaultTheme = {
  primary: {
    dark: colorTokens.primary[800],
    main: colorTokens.primary[500],
    light: colorTokens.primary[100],
  },
  neutral: {
    dark: colorTokens.grey[700],
    main: colorTokens.grey[500],
    light: colorTokens.grey[0],
  },
  text: colorTokens.grey[1000],
  background: colorTokens.grey[50],
};
