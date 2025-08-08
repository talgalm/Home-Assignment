import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useLanguageDirection } from "./hooks/useLanguageDirection";
import Home from "./home/home";
import { AppContainer } from "./App.styles";
import { SearchProvider } from "./context/SearchContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "./components/header/Header";

const queryClient = new QueryClient();

function App() {
  const direction = useLanguageDirection();

  const theme = createTheme({
    direction,
    palette: {
      mode: "dark",
      primary: {
        main: "#f5c518",
        light: "#f7d147",
        dark: "#d4a017",
      },
      secondary: {
        main: "#1a1a1a",
        light: "#2d2d2d",
        dark: "#0f0f0f",
      },
      background: {
        default: "#0f0f0f",
        paper: "#1a1a1a",
      },
      text: {
        primary: "#ffffff",
        secondary: "rgba(255, 255, 255, 0.7)",
      },
      error: {
        main: "#ff4757",
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
      },
      h4: {
        fontWeight: 700,
        letterSpacing: "-0.01em",
      },
      h6: {
        fontWeight: 600,
        letterSpacing: "-0.01em",
      },
      body1: {
        lineHeight: 1.6,
      },
      body2: {
        lineHeight: 1.5,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              fontSize: "1.1rem",
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
            padding: "8px 16px",
          },
          contained: {
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          },
          outlined: {
            borderWidth: 1,
            "&:hover": {
              borderWidth: 1,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: "rgba(15, 15, 15, 0.95)",
            backdropFilter: "blur(20px)",
          },
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SearchProvider>
          <AppContainer $direction={direction}>
            <Header />
            <Home />
          </AppContainer>
        </SearchProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
