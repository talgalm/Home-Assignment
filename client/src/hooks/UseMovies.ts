import { useQuery } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../api/apiService';

type Movie = {
  id: string;
  title: string;
};

const fetchMovies = async (): Promise<Movie[]> => {
  return ApiService.makeRequest<Movie[]>('/movies', HTTPMethod.GET);
};

export const useMovies = () => {
  return useQuery<Movie[], Error>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });
};