import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { useDeleteMovie } from "./useDeleteMovie";
import { ApiService, HTTPMethod } from "../api/apiService";
import type { Movie } from "../interfaces";
import type { InfiniteData } from "@tanstack/react-query";
import { createTestQueryClient } from "../test/test-utils";

// Mock the ApiService
vi.mock("../api/apiService", () => ({
  ApiService: {
    makeRequest: vi.fn(),
  },
  HTTPMethod: {
    DELETE: "DELETE",
  },
}));

const mockApiService = vi.mocked(ApiService);

// Test data
const mockMovie: Movie = {
  id: 1,
  title: "Test Movie",
  year: "2023",
  runtime: "120",
  genre: "Action",
  director: "Test Director",
  img: "https://example.com/poster.jpg",
};

const mockMovies: Movie[] = [
  mockMovie,
  {
    id: 2,
    title: "Another Movie",
    year: "2023",
    runtime: "95",
    genre: "Comedy",
    director: "Another Director",
    img: "https://example.com/poster2.jpg",
  },
];

const mockInfiniteData: InfiniteData<Movie[]> = {
  pages: [mockMovies],
  pageParams: [1],
};

// Test wrapper component
const createWrapper = (queryClient: QueryClient) => {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useDeleteMovie", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();

    // Clear all mocks
    vi.clearAllMocks();

    // Set up initial cache data
    queryClient.setQueryData(["movies"], mockInfiniteData);
    queryClient.setQueryData(["search-movies"], mockInfiniteData);
  });

  afterEach(() => {
    queryClient.clear();
  });

  describe("mutation function", () => {
    it("should call ApiService.makeRequest with correct parameters", async () => {
      mockApiService.makeRequest.mockResolvedValue(undefined);

      const { result } = renderHook(() => useDeleteMovie(), {
        wrapper: createWrapper(queryClient),
      });

      await result.current.mutateAsync(mockMovie);

      expect(mockApiService.makeRequest).toHaveBeenCalledWith(
        `/movies/${mockMovie.id}`,
        HTTPMethod.DELETE,
        mockMovie
      );
    });

    it("should return void when successful", async () => {
      mockApiService.makeRequest.mockResolvedValue(undefined);

      const { result } = renderHook(() => useDeleteMovie(), {
        wrapper: createWrapper(queryClient),
      });

      const response = await result.current.mutateAsync(mockMovie);

      expect(response).toBeUndefined();
    });

    it("should throw error when API call fails", async () => {
      const error = new Error("Delete failed");
      mockApiService.makeRequest.mockRejectedValue(error);

      const { result } = renderHook(() => useDeleteMovie(), {
        wrapper: createWrapper(queryClient),
      });

      await expect(result.current.mutateAsync(mockMovie)).rejects.toThrow(
        "Delete failed"
      );
    });
  });

  describe("success handling", () => {
    it("should remove deleted movie from movies cache", async () => {
      mockApiService.makeRequest.mockResolvedValue(undefined);

      const { result } = renderHook(() => useDeleteMovie(), {
        wrapper: createWrapper(queryClient),
      });

      await result.current.mutateAsync(mockMovie);

      const updatedMoviesData = queryClient.getQueryData([
        "movies",
      ]) as InfiniteData<Movie[]>;

      expect(updatedMoviesData).toBeDefined();
      expect(updatedMoviesData?.pages[0]).toHaveLength(1);
      expect(updatedMoviesData?.pages[0][0].id).toBe(2);
      expect(
        updatedMoviesData?.pages[0].find((movie) => movie.id === 1)
      ).toBeUndefined();
    });

    it("should remove deleted movie from search-movies cache", async () => {
      mockApiService.makeRequest.mockResolvedValue(undefined);

      const { result } = renderHook(() => useDeleteMovie(), {
        wrapper: createWrapper(queryClient),
      });

      await result.current.mutateAsync(mockMovie);

      const updatedSearchData = queryClient.getQueryData([
        "search-movies",
      ]) as InfiniteData<Movie[]>;

      expect(updatedSearchData).toBeDefined();
      expect(updatedSearchData?.pages[0]).toHaveLength(1);
      expect(updatedSearchData?.pages[0][0].id).toBe(2);
      expect(
        updatedSearchData?.pages[0].find((movie) => movie.id === 1)
      ).toBeUndefined();
    });

    it("should handle multiple pages in cache correctly", async () => {
      const multiPageData: InfiniteData<Movie[]> = {
        pages: [
          [mockMovie, { ...mockMovie, id: 2 }],
          [
            { ...mockMovie, id: 3 },
            { ...mockMovie, id: 4 },
          ],
        ],
        pageParams: [1, 2],
      };

      queryClient.setQueryData(["movies"], multiPageData);
      queryClient.setQueryData(["search-movies"], multiPageData);

      mockApiService.makeRequest.mockResolvedValue(undefined);

      const { result } = renderHook(() => useDeleteMovie(), {
        wrapper: createWrapper(queryClient),
      });

      await result.current.mutateAsync(mockMovie);

      const updatedData = queryClient.getQueryData(["movies"]) as InfiniteData<
        Movie[]
      >;

      expect(updatedData?.pages).toHaveLength(2);
      expect(updatedData?.pages[0]).toHaveLength(1);
      expect(updatedData?.pages[1]).toHaveLength(2);
      expect(
        updatedData?.pages[0].find((movie) => movie.id === 1)
      ).toBeUndefined();
      expect(
        updatedData?.pages[1].find((movie) => movie.id === 1)
      ).toBeUndefined();
    });

    it("should handle empty cache gracefully", async () => {
      queryClient.clear();

      mockApiService.makeRequest.mockResolvedValue(undefined);

      const { result } = renderHook(() => useDeleteMovie(), {
        wrapper: createWrapper(queryClient),
      });

      // Should not throw error when cache is empty
      await expect(
        result.current.mutateAsync(mockMovie)
      ).resolves.toBeUndefined();
    });
  });

  describe("query invalidation", () => {
    it("should invalidate movies queries", async () => {
      const invalidateQueriesSpy = vi.spyOn(queryClient, "invalidateQueries");

      mockApiService.makeRequest.mockResolvedValue(undefined);

      const { result } = renderHook(() => useDeleteMovie(), {
        wrapper: createWrapper(queryClient),
      });

      await result.current.mutateAsync(mockMovie);

      expect(invalidateQueriesSpy).toHaveBeenCalledWith({
        queryKey: ["movies"],
      });
    });

    it("should invalidate search-movies queries", async () => {
      const invalidateQueriesSpy = vi.spyOn(queryClient, "invalidateQueries");

      mockApiService.makeRequest.mockResolvedValue(undefined);

      const { result } = renderHook(() => useDeleteMovie(), {
        wrapper: createWrapper(queryClient),
      });

      await result.current.mutateAsync(mockMovie);

      expect(invalidateQueriesSpy).toHaveBeenCalledWith({
        queryKey: ["search-movies"],
      });
    });
  });

  describe("mutation state", () => {
    it("should have correct initial state", () => {
      const { result } = renderHook(() => useDeleteMovie(), {
        wrapper: createWrapper(queryClient),
      });

      expect(result.current.isPending).toBe(false);
      expect(result.current.isError).toBe(false);
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.error).toBe(null);
    });

    it("should provide mutation function", () => {
      const { result } = renderHook(() => useDeleteMovie(), {
        wrapper: createWrapper(queryClient),
      });

      expect(typeof result.current.mutate).toBe("function");
      expect(typeof result.current.mutateAsync).toBe("function");
    });
  });

  describe("edge cases", () => {
    it("should handle movie with different ID format", async () => {
      const movieWithStringId = { ...mockMovie, id: "123" as any };
      mockApiService.makeRequest.mockResolvedValue(undefined);

      const { result } = renderHook(() => useDeleteMovie(), {
        wrapper: createWrapper(queryClient),
      });

      await expect(
        result.current.mutateAsync(movieWithStringId)
      ).resolves.toBeUndefined();

      expect(mockApiService.makeRequest).toHaveBeenCalledWith(
        `/movies/${movieWithStringId.id}`,
        HTTPMethod.DELETE,
        movieWithStringId
      );
    });

    it("should handle cache with null/undefined data", async () => {
      queryClient.setQueryData(["movies"], null);
      queryClient.setQueryData(["search-movies"], undefined);

      mockApiService.makeRequest.mockResolvedValue(undefined);

      const { result } = renderHook(() => useDeleteMovie(), {
        wrapper: createWrapper(queryClient),
      });

      // Should not throw error when cache data is null/undefined
      await expect(
        result.current.mutateAsync(mockMovie)
      ).resolves.toBeUndefined();
    });
  });
});
