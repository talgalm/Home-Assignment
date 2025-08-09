import React, { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { SearchProvider } from "../context/SearchContext";
import favoritesReducer from "../store/favoritesSlice";
import type { Movie } from "../interfaces";

// Create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
  });
};

// Create a test query client
const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
};

// Test wrapper component
interface TestWrapperProps {
  children: React.ReactNode;
}

const TestWrapper: React.FC<TestWrapperProps> = ({ children }) => {
  const store = createTestStore();
  const queryClient = createTestQueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SearchProvider>{children}</SearchProvider>
      </QueryClientProvider>
    </Provider>
  );
};

// Custom render function
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: TestWrapper, ...options });

// Test data - updated to match actual Movie interface and formatMovieTitle behavior
export const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Test Movie One",
    year: "2023",
    runtime: "120",
    genre: "Action",
    director: "Test Director",
    img: "https://example.com/poster1.jpg",
  },
  {
    id: 2,
    title: "Test Movie Two",
    year: "2023",
    runtime: "95",
    genre: "Comedy",
    director: "Another Director",
    img: "https://example.com/poster2.jpg",
  },
  {
    id: 3,
    title: "Test Movie Three",
    year: "2023",
    runtime: "150",
    genre: "Drama",
    director: "Third Director",
    img: "https://example.com/poster3.jpg",
  },
];

export const mockInfiniteQueryData = {
  pages: [mockMovies.slice(0, 2), mockMovies.slice(2)],
  pageParams: [1, 2],
};

// Re-export everything
export * from "@testing-library/react";
export { customRender as render };
export { createTestStore, createTestQueryClient };
