import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useAddMovie } from './useAddMovie';
import { ApiService } from '../api/apiService';
import type { Movie } from '../interfaces';

// Mock the API service
vi.mock('../api/apiService', () => ({
  ApiService: {
    makeRequest: vi.fn(),
  },
  HTTPMethod: {
    POST: 'POST',
  },
}));

const mockApiService = vi.mocked(ApiService);

describe('useAddMovie', () => {
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

  it('successfully adds a movie', async () => {
    const newMovie: Omit<Movie, 'id'> = {
      title: 'Test Movie',
      year: '2023',
      runtime: '120 min',
      genre: ['Action', 'Drama'],
      director: 'Test Director',
      img: 'test-image.jpg'
    };

    const returnedMovie: Movie = {
      id: 1,
      ...newMovie,
    };

    mockApiService.makeRequest.mockResolvedValueOnce(returnedMovie);

    const { result } = renderHook(() => useAddMovie(), { wrapper });

    result.current.mutate(newMovie);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockApiService.makeRequest).toHaveBeenCalledWith('/movies', 'POST', newMovie);
    expect(result.current.data).toEqual(returnedMovie);
  });

  it('handles error when adding movie fails', async () => {
    const newMovie: Omit<Movie, 'id'> = {
      title: 'Test Movie',
      year: '2023',
      runtime: '120 min',
      genre: ['Action'],
      director: 'Test Director',
      img: 'test-image.jpg'
    };

    const error = new Error('Failed to add movie');
    mockApiService.makeRequest.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useAddMovie(), { wrapper });

    result.current.mutate(newMovie);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(error);
  });

  it('invalidates queries on success', async () => {
    const newMovie: Omit<Movie, 'id'> = {
      title: 'Test Movie',
      year: '2023',
      runtime: '120 min',
      genre: ['Action'],
      director: 'Test Director',
      img: 'test-image.jpg'
    };

    const returnedMovie: Movie = {
      id: 1,
      ...newMovie,
    };

    mockApiService.makeRequest.mockResolvedValueOnce(returnedMovie);

    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useAddMovie(), { wrapper });

    result.current.mutate(newMovie);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['movies'] });
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['search-movies'] });
  });
});
