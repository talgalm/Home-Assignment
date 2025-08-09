import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { useCheckTitleExists } from "./useCheckTitleExists";
import { ApiService } from "../api/apiService";

// Mock the API service
vi.mock("../api/apiService", () => ({
  ApiService: {
    makeRequest: vi.fn(),
  },
  HTTPMethod: {
    GET: "GET",
  },
}));

const mockApiService = vi.mocked(ApiService);

describe("useCheckTitleExists", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("checks if title exists and returns true", async () => {
    const title = "Existing Movie";
    const response = { exists: true };

    mockApiService.makeRequest.mockResolvedValueOnce(response);

    const { result } = renderHook(() => useCheckTitleExists(title), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockApiService.makeRequest).toHaveBeenCalledWith(
      `/movies/check-title?title=${encodeURIComponent(title)}`,
      "GET"
    );
    expect(result.current.data).toEqual(response);
  });

  it("checks if title exists and returns false", async () => {
    const title = "New Movie";
    const response = { exists: false };

    mockApiService.makeRequest.mockResolvedValueOnce(response);

    const { result } = renderHook(() => useCheckTitleExists(title), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(response);
  });

  it("does not fetch when title is empty", () => {
    const { result } = renderHook(() => useCheckTitleExists(""), { wrapper });

    // When a query is disabled, it should not make API calls
    expect(mockApiService.makeRequest).not.toHaveBeenCalled();
    expect(result.current.data).toBeUndefined();
  });

  it("does not fetch when title is less than 2 characters", () => {
    const { result } = renderHook(() => useCheckTitleExists("A"), { wrapper });

    // When a query is disabled, it should not make API calls
    expect(mockApiService.makeRequest).not.toHaveBeenCalled();
    expect(result.current.data).toBeUndefined();
  });

  it("fetches when title is 2 or more characters", async () => {
    const title = "Ab";
    const response = { exists: false };

    mockApiService.makeRequest.mockResolvedValueOnce(response);

    const { result } = renderHook(() => useCheckTitleExists(title), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockApiService.makeRequest).toHaveBeenCalled();
  });

  it("handles API errors", async () => {
    const title = "Test Movie";
    const error = new Error("API Error");

    mockApiService.makeRequest.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useCheckTitleExists(title), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(error);
  });

  it("handles special characters in title", async () => {
    const title = "Movie with @#$% characters";
    const response = { exists: false };

    mockApiService.makeRequest.mockResolvedValueOnce(response);

    const { result } = renderHook(() => useCheckTitleExists(title), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockApiService.makeRequest).toHaveBeenCalledWith(
      `/movies/check-title?title=${encodeURIComponent(title)}`,
      "GET"
    );
  });
});
