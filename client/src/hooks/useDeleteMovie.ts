import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../api/apiService';
import type { Movie } from '../interfaces';

const deleteMovie = async (movie: Movie): Promise<void> => {
  return ApiService.makeRequest<void>(`/movies/${movie.id}`, HTTPMethod.DELETE, movie);
};

export const useDeleteMovie = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: deleteMovie,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['movies'] });
      },
    });
  };