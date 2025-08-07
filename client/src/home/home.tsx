import React, { useState, useMemo } from "react";
import GeneralLoader from "../components/loader/loader";
import { useInfiniteSearchMovies } from "../hooks/useSearchMovies";
import { useDebounce } from "../hooks/useDebounce";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import Popup from "../components/popup/Popup";
import { HomeContainer } from "./Home.styles";
import type { Movie } from "../interfaces";
import MovieGrid from "../components/movie-grid/MovieGrid";
import { useSearch } from "../context/SearchContext";
import { useAppSelector } from "../store/hooks";
import { useAtom } from "jotai";
import { showFavoritesOnlyAtom } from "../store/favoritesViewAtom";
import { Box, Typography } from "@mui/material";
import type { RootState } from "../store";
import { useMovies } from "../hooks/UseMovies";

const Home: React.FC = () => {
  const { searchValue } = useSearch();
  const debouncedSearchValue = useDebounce(searchValue, 500);

  // Use infinite queries for both regular movies and search results
  const {
    data: moviesData,
    isLoading: isLoadingMovies,
    error: moviesError,
    fetchNextPage: fetchNextMoviesPage,
    hasNextPage: hasNextMoviesPage,
    isFetchingNextPage: isFetchingNextMoviesPage,
  } = useMovies();

  const {
    data: searchData,
    isLoading: isLoadingSearch,
    error: searchError,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetchingNextPage: isFetchingNextSearchPage,
  } = useInfiniteSearchMovies(debouncedSearchValue);

  const [modal, setModal] = useState(false);
  const [editMovie, setEditMovie] = useState<Movie | undefined>(undefined);
  const favorites = useAppSelector(
    (state: any) => state.favorites.movies as Movie[]
  );
  const [showFavoritesOnly] = useAtom(showFavoritesOnlyAtom);

  // Flatten all pages of movies into a single array
  const allMovies = useMemo(() => {
    if (debouncedSearchValue) {
      return searchData?.pages.flatMap((page) => page) || [];
    }
    return moviesData?.pages.flatMap((page) => page) || [];
  }, [debouncedSearchValue, moviesData, searchData]);

  // Filter to show only favorites if showFavoritesOnly is true
  const displayMovies = useMemo(() => {
    if (showFavoritesOnly && allMovies) {
      return allMovies.filter((movie: Movie) =>
        favorites.some((fav: Movie) => fav.id === movie.id)
      );
    }
    return allMovies;
  }, [showFavoritesOnly, allMovies, favorites]);

  // Determine loading states
  const isLoadingData = debouncedSearchValue
    ? isLoadingSearch
    : isLoadingMovies;
  const isFetchingNextPage = debouncedSearchValue
    ? isFetchingNextSearchPage
    : isFetchingNextMoviesPage;
  const hasNextPage = debouncedSearchValue
    ? hasNextSearchPage
    : hasNextMoviesPage;
  const error = debouncedSearchValue ? searchError : moviesError;

  // Set up infinite scroll
  const handleLoadMore = () => {
    if (debouncedSearchValue) {
      fetchNextSearchPage();
    } else {
      fetchNextMoviesPage();
    }
  };

  useInfiniteScroll({
    onLoadMore: handleLoadMore,
    hasNextPage: !!hasNextPage,
    isLoading: isFetchingNextPage,
  });

  // Only show the general loader if we're loading and have no movies at all
  if (isLoadingData && displayMovies.length === 0)
    return (
      <GeneralLoader
        loading={true}
        text={debouncedSearchValue ? "Searching..." : "Loading movies..."}
      />
    );

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
      <MovieGrid
        movies={displayMovies}
        onMovieClick={handlEditMovie}
        error={error?.message}
        isLoadingMore={isFetchingNextPage}
        hasNextPage={!!hasNextPage}
        isLoading={isLoadingData}
      />
      <Popup isOpen={modal} onClose={() => setModal(false)} movie={editMovie} />
    </HomeContainer>
  );
};

export default Home;
