import { useQuery } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../api/apiService';
import type { Movie } from '../interfaces';

const searchMovies = async (searchTerm: string): Promise<Movie[]> => {
  return ApiService.makeRequest<Movie[]>(
    `/movies/search?query=${encodeURIComponent(searchTerm)}`,
    HTTPMethod.GET
  );
};

export const useSearchMovies = (searchTerm: string) => {
  return useQuery<Movie[], Error>({
    queryKey: ['searchMovies', searchTerm],
    queryFn: () => searchMovies(searchTerm),
    enabled: !!searchTerm,
  });
};