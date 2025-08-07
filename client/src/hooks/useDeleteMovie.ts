import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../api/apiService';


const deleteMovie = async (movieId: string): Promise<void> => {
  return ApiService.makeRequest<void>(`/movies/${movieId}`, HTTPMethod.DELETE);
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