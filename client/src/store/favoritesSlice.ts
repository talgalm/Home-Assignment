import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '../interfaces';
import { ApiService } from '../api/apiService';

interface FavoritesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  movies: [],
  loading: false,
  error: null,
};

// Async thunks for backend integration
export const addFavoriteAsync = createAsyncThunk(
  'favorites/addFavoriteAsync',
  async (data: { movie: Movie; username: string }) => {
    const { movie, username } = data;
    const favoriteData = {
      title: movie.title,
      director: movie.director,
      year: movie.year,
      genre: movie.genre,
      runtime: movie.runtime,
      img: movie.img,
      username,
    };
    const response = await ApiService.addFavorite(favoriteData);
    return response;
  }
);

export const removeFavoriteAsync = createAsyncThunk(
  'favorites/removeFavoriteAsync',
  async (data: { movieId: number; username: string }) => {
    await ApiService.deleteFavorite(data.movieId);
    return data.movieId;
  }
);

export const fetchFavoritesAsync = createAsyncThunk(
  'favorites/fetchFavoritesAsync',
  async (username: string) => {
    const favorites = await ApiService.getFavorites(username);
    return favorites;
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Movie>) => {
      const movieExists = state.movies.some(movie => movie.id === action.payload.id);
      if (!movieExists) {
        state.movies.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter(movie => movie.id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<Movie>) => {
      const movieIndex = state.movies.findIndex(movie => movie.id === action.payload.id);
      if (movieIndex >= 0) {
        state.movies.splice(movieIndex, 1);
      } else {
        state.movies.push(action.payload);
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add favorite
      .addCase(addFavoriteAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavoriteAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Don't modify state here - optimistic update already handled it
      })
      .addCase(addFavoriteAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add favorite';
      })
      // Remove favorite
      .addCase(removeFavoriteAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFavoriteAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Don't modify state here - optimistic update already handled it
      })
      .addCase(removeFavoriteAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to remove favorite';
      })
      // Fetch favorites
      .addCase(fetchFavoritesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoritesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchFavoritesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch favorites';
      });
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, clearError } = favoritesSlice.actions;
export default favoritesSlice.reducer;
