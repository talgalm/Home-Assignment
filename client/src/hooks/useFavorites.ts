import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useAtom } from 'jotai';
import { userAtom } from '../store/userAtom';
import {
  addFavoriteAsync,
  removeFavoriteAsync,
  fetchFavoritesAsync,
  toggleFavorite,
  addFavorite,
  removeFavorite,
} from '../store/favoritesSlice';
import type { Movie } from '../interfaces';
import type { RootState } from '../store';

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const [user] = useAtom(userAtom);
  const favorites = useAppSelector((state: RootState) => state.favorites.movies);
  const loading = useAppSelector((state: RootState) => state.favorites.loading);
  const error = useAppSelector((state: RootState) => state.favorites.error);
  const [togglingMovieId, setTogglingMovieId] = useState<number | null>(null);

  // Fetch favorites from backend when user is available
  useEffect(() => {
    if (user?.username) {
      dispatch(fetchFavoritesAsync(user.username));
    }
  }, [user?.username, dispatch]);

  const toggleFavoriteWithBackend = useCallback(
    async (movie: Movie) => {
      if (!user?.username || togglingMovieId === movie.id) {
        return;
      }

      setTogglingMovieId(movie.id);
      const isFavorite = favorites.some((fav) => fav.id === movie.id);

      // Optimistic update
      dispatch(toggleFavorite(movie));

      try {
        if (isFavorite) {
          // Remove from backend - don't let the async action update state again
          await dispatch(removeFavoriteAsync({ movieId: movie.id, username: user.username }));
        } else {
          // Add to backend - don't let the async action update state again
          await dispatch(addFavoriteAsync({ movie, username: user.username }));
        }
      } catch (error) {
        // Revert optimistic update on error
        dispatch(toggleFavorite(movie));
        throw error;
      } finally {
        setTogglingMovieId(null);
      }
    },
    [user?.username, favorites, dispatch, togglingMovieId]
  );

  const addFavoriteWithBackend = useCallback(
    async (movie: Movie) => {
      if (!user?.username) {
        return;
      }

      // Optimistic update
      dispatch(addFavorite(movie));

      try {
        await dispatch(addFavoriteAsync({ movie, username: user.username })).unwrap();
      } catch (error) {
        // Revert optimistic update on error
        dispatch(removeFavorite(movie.id));
        throw error;
      }
    },
    [user?.username, dispatch]
  );

  const removeFavoriteWithBackend = useCallback(
    async (movieId: number) => {
      if (!user?.username) {
        return;
      }

      const movie = favorites.find((fav) => fav.id === movieId);
      if (!movie) return;

      // Optimistic update
      dispatch(removeFavorite(movieId));

      try {
        await dispatch(removeFavoriteAsync({ movieId, username: user.username })).unwrap();
      } catch (error) {
        // Revert optimistic update on error
        dispatch(addFavorite(movie));
        throw error;
      }
    },
    [user?.username, favorites, dispatch]
  );

  const isFavorite = useCallback(
    (movieId: number) => {
      return favorites.some((fav) => fav.id === movieId);
    },
    [favorites]
  );

  const isTogglingFavorite = useCallback(
    (movieId: number) => {
      return togglingMovieId === movieId;
    },
    [togglingMovieId]
  );

  const refreshFavorites = useCallback(() => {
    if (user?.username) {
      dispatch(fetchFavoritesAsync(user.username));
    }
  }, [user?.username, dispatch]);

  return {
    favorites,
    loading,
    error,
    toggleFavoriteWithBackend,
    addFavoriteWithBackend,
    removeFavoriteWithBackend,
    isFavorite,
    isTogglingFavorite,
    refreshFavorites,
  };
};
