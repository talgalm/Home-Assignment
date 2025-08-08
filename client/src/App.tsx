import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { useLanguageDirection } from "./hooks/useLanguageDirection";
import Home from "./home/home";
import { AppContainer } from "./App.styles";
import { SearchProvider } from "./context/SearchContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "./components/header/Header";
import { getAppTheme } from "./theme/theme";

const queryClient = new QueryClient();

function App() {
  const direction = useLanguageDirection();
  const theme = getAppTheme(direction);

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
