import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#d8b879",
    },
    secondary: {
      main: "#f1ece2",
    },
    background: {
      default: "#050506",
      paper: "#0d0c0c",
    },
    text: {
      primary: "#f1ece2",
      secondary: "rgba(255, 255, 255, 0.58)",
    },
  },
  shape: {
    borderRadius: 2,
  },
  typography: {
    fontFamily: "var(--font-sans), Arial, sans-serif",

    h1: {
      fontFamily: "var(--font-serif), serif",
      fontWeight: 500,
    },

    h2: {
      fontFamily: "var(--font-serif), serif",
    },

    h3: {
      fontFamily: "var(--font-serif), serif",
    },
  },
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
      easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
      easeIn: "cubic-bezier(0.7, 0, 0.84, 0)",
      sharp: "cubic-bezier(0.22, 1, 0.36, 1)",
    },
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});
