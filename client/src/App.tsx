import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./home/Home";
import Header from "./components/header";
import { AppContainer } from "./App.styles";
import { SearchProvider } from "./context/SearchContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <AppContainer>
          <Header />
          <Home />
        </AppContainer>
      </SearchProvider>
    </QueryClientProvider>
  );
}

export default App;
