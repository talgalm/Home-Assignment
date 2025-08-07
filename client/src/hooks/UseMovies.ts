import { useInfiniteQuery } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../api/apiService';
import type { Movie } from '../interfaces';
import type { AxiosError } from 'axios';

const fetchMovies = async (page: number): Promise<Movie[]> => {
  return ApiService.makeRequest<Movie[]>(
    `/movies?page=${page}`,
    HTTPMethod.GET
  );
};

export const useMovies = () => {
  return useInfiniteQuery<Movie[], AxiosError>({
    queryKey: ['movies'],
    queryFn: ({ pageParam = 1 }) => fetchMovies(pageParam),
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
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
