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
        queryClient.invalidateQueries({ queryKey: ['movies'] });
      },
    });
  };
  