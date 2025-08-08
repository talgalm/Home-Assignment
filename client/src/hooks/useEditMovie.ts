import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../api/apiService';
import type { Movie } from '../interfaces';
import type { InfiniteData } from '@tanstack/react-query';

const editMovie = async (movie: Movie): Promise<Movie> => {
  const { id, ...payload } = movie;

  return ApiService.makeRequest<Movie>(`/movies/${id}`, HTTPMethod.PUT, payload);
};

export const useEditMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editMovie,
    onSuccess: (updatedMovie) => {
      queryClient.setQueryData(['movies'], (oldData: InfiniteData<Movie[]> | undefined) => {
        if (!oldData) return oldData;
        
        return {
          ...oldData,
          pages: oldData.pages.map((page: Movie[]) =>
            page.map((movie: Movie) =>
              movie.id === updatedMovie.id ? updatedMovie : movie
            )
          ),
        };
      });

      queryClient.setQueriesData(
        { queryKey: ['search-movies'] },
        (oldData: InfiniteData<Movie[]> | undefined) => {
          if (!oldData) return oldData;
          
          return {
            ...oldData,
            pages: oldData.pages.map((page: Movie[]) =>
              page.map((movie: Movie) =>
                movie.id === updatedMovie.id ? updatedMovie : movie
              )
            ),
          };
        }
      );

      queryClient.invalidateQueries({ queryKey: ['movies'] });
      queryClient.invalidateQueries({ queryKey: ['search-movies'] });
    },
  });
};