import { useInfiniteQuery } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../api/apiService';
import type { Movie } from '../interfaces';

const fetchSearchMovies = async (searchTerm: string, page: number): Promise<Movie[]> => {
  return ApiService.makeRequest<Movie[]>(
    `/movies/search?query=${encodeURIComponent(searchTerm)}&page=${page}`,
    HTTPMethod.GET
  );
};

export const useInfiniteSearchMovies = (searchTerm: string) => {
  return useInfiniteQuery<Movie[], Error>({
    queryKey: ['search-movies', searchTerm],
    queryFn: ({ pageParam = 1 }) => fetchSearchMovies(searchTerm, pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      
      const expectedPageSize = 12;
      if (lastPage.length < expectedPageSize) {
        return undefined;
      }
      
      return allPages.length + 1;
    },
    initialPageParam: 1,
    enabled: !!searchTerm && searchTerm.length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
