import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import GeneralLoader from "../components/loader/loader";
import { useMovies } from "../hooks/UseMovies";
import { useInfiniteSearchMovies } from "../hooks/useSearchMovies";
import { useDebounce } from "../hooks/useDebounce";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import Popup from "../components/popup/Popup";
import { HomeContainer } from "./home.styles";
import type { Movie } from "../interfaces";
import MovieGrid from "../components/movie-grid/MovieGrid";
import { useSearch } from "../context/SearchContext";
import { useAtom } from "jotai";
import { showFavoritesOnlyAtom } from "../store/favoritesViewAtom";
import { useFavorites } from "../hooks/useFavorites";
import { Box } from "@mui/material";
import GeneralTypography from "../components/typography/Typography";
import { useLanguageDirection } from "../hooks/useLanguageDirection";
import MovieDetail from "../components/movie-detail/MovieDetail";
import { userAtom } from "../store/userAtom";
import UsernameDialog from "../components/username-dialog/UsernameDialog";
import { useUsernameDialog } from "../hooks/useUsernameDialog";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const direction = useLanguageDirection();
  const { searchValue } = useSearch();
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

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
  const { favorites, loading: favoritesLoading } = useFavorites();
  const [showFavoritesOnly] = useAtom(showFavoritesOnlyAtom);
  const [user] = useAtom(userAtom);
  const { isOpen, openDialog, closeDialog, handleSuccess } =
    useUsernameDialog();

  const allMovies = useMemo(() => {
    if (debouncedSearchValue) {
      return searchData?.pages.flatMap((page) => page) || [];
    }
    return moviesData?.pages.flatMap((page) => page) || [];
  }, [debouncedSearchValue, moviesData, searchData]);

  const displayMovies = useMemo(() => {
    if (showFavoritesOnly) {
      return favorites;
    }
    return allMovies;
  }, [showFavoritesOnly, allMovies, favorites]);

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

  if (
    (isLoadingData && displayMovies.length === 0) ||
    (showFavoritesOnly && favoritesLoading && favorites.length === 0)
  )
    return (
      <GeneralLoader
        loading={true}
        text={
          showFavoritesOnly
            ? t("Favorites.loading")
            : debouncedSearchValue
            ? t("Search.searching")
            : t("Home.loading")
        }
      />
    );

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleEditMovie = (movie: Movie) => {
    if (user) {
      setEditMovie(movie);
      setModal(true);
    } else {
      openDialog(() => {
        setEditMovie(movie);
        setModal(true);
      });
    }
  };

  const handleBackToList = () => {
    setSelectedMovie(null);
  };

  if (selectedMovie) {
    return (
      <HomeContainer $direction={direction}>
        <MovieDetail
          movie={selectedMovie}
          onBack={handleBackToList}
          onEdit={handleEditMovie}
        />
        <Popup
          isOpen={modal}
          onClose={() => setModal(false)}
          movie={editMovie}
        />
      </HomeContainer>
    );
  }

  return (
    <HomeContainer $direction={direction}>
      {showFavoritesOnly && (
        <Box
          sx={{
            mb: 3,
            p: 3,
            background: "linear-gradient(135deg, #141414 0%, #1a1a1a 100%)",
            borderRadius: 2,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
          }}
        >
          <GeneralTypography
            variant="h5"
            value={` ${t("Favorites.title")}`}
            styleProps={{
              color: "#E50914",
              fontWeight: 700,
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          />
        </Box>
      )}
      <MovieGrid
        movies={displayMovies}
        onMovieClick={handleMovieClick}
        onMovieEditClick={handleEditMovie}
        error={error?.message}
        isLoadingMore={isFetchingNextPage}
        hasNextPage={!!hasNextPage}
        isLoading={isLoadingData}
      />
      <Popup isOpen={modal} onClose={() => setModal(false)} movie={editMovie} />
      <UsernameDialog
        open={isOpen}
        onClose={closeDialog}
        onSuccess={handleSuccess}
      />
    </HomeContainer>
  );
};

export default Home;
