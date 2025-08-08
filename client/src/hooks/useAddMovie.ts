import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../api/apiService';
import type { Movie } from '../interfaces';

const addMovie = async (newMovie: Omit<Movie, 'id'>): Promise<Movie> => {
  return ApiService.makeRequest<Movie>('/movies', HTTPMethod.POST, newMovie);
};

export const useAddMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMovie,
    onSuccess: () => {
      // Invalidate both movies and search queries since a new movie might appear in search results
      queryClient.invalidateQueries({ queryKey: ['movies'] });
      queryClient.invalidateQueries({ queryKey: ['search-movies'] });
    },
  });
};
  