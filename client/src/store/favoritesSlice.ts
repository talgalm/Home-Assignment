import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from '../interfaces';

interface FavoritesState {
  movies: Movie[];
}

const initialState: FavoritesState = {
  movies: [],
};

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
      console.log('Toggle favorite action:', action.payload);
      console.log('Current state before toggle:', state.movies);
      const movieIndex = state.movies.findIndex(movie => movie.id === action.payload.id);
      console.log('Movie index found:', movieIndex);
      if (movieIndex >= 0) {
        state.movies.splice(movieIndex, 1);
        console.log('Removed movie from favorites');
      } else {
        state.movies.push(action.payload);
        console.log('Added movie to favorites');
      }
      console.log('State after toggle:', state.movies);
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
