import { useQuery } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../api/apiService';
import type { Movie } from '../interfaces';
import type { AxiosError } from 'axios';

const fetchMovies = async (page?: number): Promise<Movie[]> => {
  return ApiService.makeRequest<Movie[]>(
    `/movies?page=${page}`,
    HTTPMethod.GET
  );
};

export const useMovies = (page?: number) => {
  return useQuery<Movie[], AxiosError>({
    queryKey: ['movies', page],
    queryFn: () => fetchMovies(page ?? 0),
  });
};