import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../api/apiService';
import type { Movie } from '../interfaces';
import type { InfiniteData } from '@tanstack/react-query';

const deleteMovie = async (movie: Movie): Promise<void> => {
  return ApiService.makeRequest<void>(`/movies/${movie.id}`, HTTPMethod.DELETE, movie);
};

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMovie,
    onSuccess: (_, deletedMovie) => {
      // Remove from regular movies cache
      queryClient.setQueryData(['movies'], (oldData: InfiniteData<Movie[]> | undefined) => {
        if (!oldData) return oldData;
        
        return {
          ...oldData,
          pages: oldData.pages.map((page: Movie[]) => 
            page.filter((movie: Movie) => movie.id !== deletedMovie.id)
          ),
        };
      });

      // Remove from search results cache for all search terms
      queryClient.setQueriesData(
        { queryKey: ['search-movies'] },
        (oldData: InfiniteData<Movie[]> | undefined) => {
          if (!oldData) return oldData;
          
          return {
            ...oldData,
            pages: oldData.pages.map((page: Movie[]) => 
              page.filter((movie: Movie) => movie.id !== deletedMovie.id)
            ),
          };
        }
      );

      // Also invalidate queries to ensure data consistency
      queryClient.invalidateQueries({ queryKey: ['movies'] });
      queryClient.invalidateQueries({ queryKey: ['search-movies'] });
    },
  });
};