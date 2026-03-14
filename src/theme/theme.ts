import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#111111",
    },
    secondary: {
      main: "#8b5cf6",
    },
  },
  typography: {
    fontFamily: "Lato, sans-serif",

    h1: {
      fontFamily: "Playfair Display, serif",
      fontWeight: 500,
    },

    h2: {
      fontFamily: "Playfair Display, serif",
    },

    h3: {
      fontFamily: "Playfair Display, serif",
    },
  },
});
