import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../api/apiService';
import type { Movie } from '../interfaces';

const editMovie = async (movie: Partial<Movie> & { id: number }): Promise<Movie> => {
  const { id, ...payload } = movie;

  return ApiService.makeRequest<Movie>(`/movies/${id}`, HTTPMethod.PUT, payload);
};

export const useEditMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};