import React, { useState } from "react";
import GeneralLoader from "../components/loader/loader";
import { useMovies } from "../hooks/useMovies";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { useDebounce } from "../hooks/useDebounce";
import Popup from "../components/popup/Popup";
import { HomeContainer } from "./Home.styles";
import type { Movie } from "../interfaces";
import MovieGrid from "../components/movie-grid/MovieGrid";
import { useSearch } from "../context/SearchContext";
import { useAppSelector } from "../store/hooks";
import { useAtom } from "jotai";
import { showFavoritesOnlyAtom } from "../store/favoritesViewAtom";
import { Box, Typography } from "@mui/material";

const Home: React.FC = () => {
  const { searchValue } = useSearch();
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const { data: movies, isLoading, error } = useMovies();
  const { data: searchResults, isLoading: isSearching } =
    useSearchMovies(debouncedSearchValue);
  const [modal, setModal] = useState(false);
  const [editMovie, setEditMovie] = useState<Movie | undefined>(undefined);
  const favorites = useAppSelector(
    (state: any) => state.favorites.movies as Movie[]
  );
  const [showFavoritesOnly] = useAtom(showFavoritesOnlyAtom);

  let displayMovies = debouncedSearchValue ? searchResults : movies;

  // Filter to show only favorites if showFavoritesOnly is true
  if (showFavoritesOnly && displayMovies) {
    displayMovies = displayMovies.filter((movie: Movie) =>
      favorites.some((fav: Movie) => fav.id === movie.id)
    );
  }
  const isLoadingData = debouncedSearchValue ? isSearching : isLoading;

  if (isLoadingData)
    return (
      <GeneralLoader
        loading={true}
        text={debouncedSearchValue ? "Searching..." : "Loading movies..."}
      />
    );

  if (error) return <div>Error loading movies: {error.message}</div>;

  const handlEditMovie = (movie: Movie) => {
    setEditMovie(movie);
    setModal(true);
  };

  return (
    <HomeContainer>
      {showFavoritesOnly && (
        <Box sx={{ mb: 2, p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
          <Typography variant="h6" color="primary">
            ⭐ Favorites
          </Typography>
        </Box>
      )}
      <MovieGrid movies={displayMovies || []} onMovieClick={handlEditMovie} />
      <Popup isOpen={modal} onClose={() => setModal(false)} movie={editMovie} />
    </HomeContainer>
  );
};

export default Home;
