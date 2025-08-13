import { createTheme } from "@mui/material/styles";

export const getAppTheme = (direction: "ltr" | "rtl") =>
  createTheme({
    direction,
    palette: {
      mode: "dark",
      primary: {
        main: "#E50914", // Netflix signature red
        light: "#ff1a1a",
        dark: "#b2070e",
      },
      secondary: {
        main: "#141414", // Netflix dark background
        light: "#1f1f1f",
        dark: "#0a0a0a",
      },
      background: {
        default: "#000000", // Pure black like Netflix
        paper: "#141414",
      },
      text: {
        primary: "#ffffff",
        secondary: "rgba(255, 255, 255, 0.7)",
      },
      error: {
        main: "#E50914",
      },
      success: {
        main: "#46d369",
      },
      warning: {
        main: "#e87c03",
      },
      info: {
        main: "#0071eb",
      },
    },
    typography: {
      fontFamily:
        direction === "rtl"
          ? '"Heebo", "Inter", "Roboto", "Helvetica", "Arial", sans-serif'
          : '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 900,
        letterSpacing: "-0.03em",
        fontSize: "3.5rem",
      },
      h2: {
        fontWeight: 800,
        letterSpacing: "-0.02em",
        fontSize: "2.8rem",
      },
      h3: {
        fontWeight: 700,
        letterSpacing: "-0.01em",
        fontSize: "2.2rem",
      },
      h4: {
        fontWeight: 700,
        letterSpacing: "-0.01em",
        fontSize: "1.8rem",
      },
      h5: {
        fontWeight: 600,
        letterSpacing: "-0.01em",
        fontSize: "1.4rem",
      },
      h6: {
        fontWeight: 600,
        letterSpacing: "-0.01em",
        fontSize: "1.2rem",
      },
      body1: {
        lineHeight: 1.6,
        fontSize: "1rem",
      },
      body2: {
        lineHeight: 1.5,
        fontSize: "0.9rem",
      },
      button: {
        fontWeight: 600,
        textTransform: "none",
        fontSize: "1rem",
      },
    },
    shape: {
      borderRadius: 4, // Netflix uses smaller border radius
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            background: "linear-gradient(135deg, #141414 0%, #1a1a1a 100%)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "scale(1.02)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              fontSize: "1.1rem",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              "&:hover": {
                border: "1px solid rgba(255, 255, 255, 0.2)",
              },
              "&.Mui-focused": {
                border: "2px solid #E50914",
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 4,
            padding: "12px 24px",
            fontSize: "1rem",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "translateY(-1px)",
            },
          },
          contained: {
            boxShadow: "none",
            background: "linear-gradient(135deg, #E50914 0%, #ff1a1a 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #ff1a1a 0%, #E50914 100%)",
              boxShadow: "0 4px 12px rgba(229, 9, 20, 0.4)",
            },
          },
          outlined: {
            borderWidth: 2,
            borderColor: "#E50914",
            color: "#E50914",
            "&:hover": {
              borderWidth: 2,
              backgroundColor: "rgba(229, 9, 20, 0.1)",
            },
          },
          text: {
            color: "#E50914",
            "&:hover": {
              backgroundColor: "rgba(229, 9, 20, 0.1)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            background: "linear-gradient(135deg, #141414 0%, #1a1a1a 100%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 100%)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          },
        },
      },
    },
  });