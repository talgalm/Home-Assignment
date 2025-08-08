import { useInfiniteQuery } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../api/apiService';
import type { Movie } from '../interfaces';
import type { AxiosError } from 'axios';

const fetchSearchMovies = async (searchTerm: string, page: number): Promise<Movie[]> => {
  return ApiService.makeRequest<Movie[]>(
    `/movies/search?query=${encodeURIComponent(searchTerm)}&page=${page}`,
    HTTPMethod.GET
  );
};

export const useInfiniteSearchMovies = (searchTerm: string) => {
  return useInfiniteQuery<Movie[], AxiosError>({
    queryKey: ['search-movies', searchTerm],
    queryFn: ({ pageParam = 1 }) => fetchSearchMovies(searchTerm, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      // If the last page is empty, we've reached the end
      if (lastPage.length === 0) {
        return undefined;
      }
      
      // If the last page has fewer items than expected, we might be at the end
      // Adjust this threshold based on your API's page size
      const expectedPageSize = 12; // Adjust this based on your API
      if (lastPage.length < expectedPageSize) {
        return undefined;
      }
      
      return allPages.length + 1;
    },
    initialPageParam: 1,
    enabled: !!searchTerm && searchTerm.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
