import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../api/apiService';
import type { Movie } from '../interfaces';
import type { InfiniteData } from '@tanstack/react-query';

const serializeMovie = (movie: Movie): Record<string, string | number | boolean> => {
  return {
    id: movie.id,
    title: movie.title,
    year: movie.year,
    runtime: movie.runtime,
    genre: movie.genre,
    director: movie.director,
    img: movie.img || '',
  };
};

const deleteMovie = async (movie: Movie): Promise<void> => {
  return ApiService.makeRequest<void>(`/movies/${movie.id}`, HTTPMethod.DELETE, serializeMovie(movie));
};

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMovie,
    onSuccess: (_, deletedMovie) => {

      queryClient.setQueryData(['movies'], (oldData: InfiniteData<Movie[]> | undefined) => {
        if (!oldData) return oldData;
        
        return {
          ...oldData,
          pages: oldData.pages.map((page: Movie[]) => 
            page.filter((movie: Movie) => movie.id !== deletedMovie.id)
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
              page.filter((movie: Movie) => movie.id !== deletedMovie.id)
            ),
          };
        }
      );


      queryClient.invalidateQueries({ queryKey: ['movies'] });
      queryClient.invalidateQueries({ queryKey: ['search-movies'] });
    },
  });
};