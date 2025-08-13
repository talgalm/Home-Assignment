import React from "react";
import { useTranslation } from "react-i18next";
import type { Movie } from "../../interfaces";
import MovieCard from "../movie-card/MovieCard";
import { showFavoritesOnlyAtom } from "../../store/favoritesViewAtom";
import { useAtom } from "jotai";
import {
  MovieGridContainer,
  EmptyStateWrapper,
  EmptyStateIcon,
  EmptyStateText,
  LoadMoreWrapper,
  LoadMoreContent,
  NoMoreMoviesWrapper,
  NoMoreMoviesText,
} from "./MovieGrid.styles";
import { CircularProgress } from "@mui/material";

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  onMovieEditClick: (movie: Movie) => void;
  error?: string | null;
  isLoadingMore?: boolean;
  hasNextPage?: boolean;
  isLoading?: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  onMovieClick,
  onMovieEditClick,
  error,
  isLoadingMore = false,
  hasNextPage = false,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const isEmpty = movies.length === 0 && !error && !isLoading;
  const [showFavoritesOnly] = useAtom(showFavoritesOnlyAtom);

  return (
    <MovieGridContainer isEmpty={isEmpty || !!error}>
      {isEmpty || error ? (
        <EmptyStateWrapper>
          <EmptyStateIcon
            sx={{ fontSize: 60, color: error ? "error.main" : "#E50914" }}
          />
          <EmptyStateText color={error ? "error.main" : "text.secondary"}>
            {error
              ? `${t("Home.error")}: ${error}`
              : showFavoritesOnly
              ? t("Favorites.noFavorites")
              : t("Home.noMovies")}
          </EmptyStateText>
        </EmptyStateWrapper>
      ) : (
        <>
          {movies.map((movie: Movie) => (
            <div key={movie.id}>
              <MovieCard
                movie={movie}
                onClick={() => onMovieClick(movie)}
                onEditClick={() => onMovieEditClick(movie)}
              />
            </div>
          ))}

          {isLoadingMore && !showFavoritesOnly && (
            <LoadMoreWrapper>
              <LoadMoreContent>
                <CircularProgress size={40} />
                <EmptyStateText>{t("Home.loadMore")}</EmptyStateText>
              </LoadMoreContent>
            </LoadMoreWrapper>
          )}

          {!hasNextPage && movies.length > 0 && !isLoadingMore && (
            <NoMoreMoviesWrapper>
              <NoMoreMoviesText color="text.secondary">
                {t("Home.noMovies")}
              </NoMoreMoviesText>
            </NoMoreMoviesWrapper>
          )}
        </>
      )}
    </MovieGridContainer>
  );
};

export default MovieGrid;
