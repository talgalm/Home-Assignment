# Redux Favorites Implementation

This project now uses Redux Toolkit to manage favorite movies state.

## Features Added

### 1. Redux Store Setup
- **Store**: `src/store/index.ts` - Main Redux store configuration
- **Favorites Slice**: `src/store/favoritesSlice.ts` - Manages favorite movies state
- **Typed Hooks**: `src/store/hooks.ts` - TypeScript-friendly Redux hooks

### 2. Favorites Management
- **Add to Favorites**: Click the star icon on any movie card to add it to favorites
- **Remove from Favorites**: Click the filled star icon to remove from favorites
- **Toggle Functionality**: The `toggleFavorite` action handles both add and remove operations

### 3. UI Updates
- **MovieCard Component**: Updated to use Redux state instead of local state
- **Header Component**: Added favorites counter badge showing number of favorite movies
- **FavoritesPage Component**: New component to display all favorite movies

## Redux Actions

### `toggleFavorite(movie: Movie)`
- Adds a movie to favorites if not already present
- Removes a movie from favorites if already present
- Prevents duplicate entries

### `addFavorite(movie: Movie)`
- Adds a movie to favorites (only if not already present)

### `removeFavorite(movieId: number)`
- Removes a movie from favorites by ID

## State Structure

```typescript
interface FavoritesState {
  movies: Movie[];
}
```

## Usage

### In Components
```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleFavorite } from '../store/favoritesSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state: any) => state.favorites.movies);
  
  const handleToggleFavorite = (movie: Movie) => {
    dispatch(toggleFavorite(movie));
  };
};
```

### Check if Movie is Favorite
```typescript
const isFavorite = favorites.some((movie: Movie) => movie.id === currentMovie.id);
```

## Files Modified

1. **src/store/index.ts** - Redux store configuration
2. **src/store/favoritesSlice.ts** - Favorites state management
3. **src/store/hooks.ts** - Typed Redux hooks
4. **src/main.tsx** - Added Redux Provider
5. **src/components/movie-card/MovieCard.tsx** - Updated to use Redux
6. **src/components/header/Header.tsx** - Added favorites counter
7. **src/components/favorites/FavoritesPage.tsx** - New favorites display page

## Dependencies Added

- `@reduxjs/toolkit` - Redux Toolkit for simplified Redux setup
- `react-redux` - React bindings for Redux
