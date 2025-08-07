import React from "react";
import { MovieGridContainer } from "./MovieGrid.styles";
import type { Movie } from "../../interfaces";
import MovieCard from "../movie-card/MovieCard";
import { Box, Typography } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { showFavoritesOnlyAtom } from "../../store/favoritesViewAtom";
import { useAtom } from "jotai";

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  error?: string | null;
}

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  onMovieClick,
  error,
}) => {
  const isEmpty = movies.length === 0 && !error;
  const [showFavoritesOnly] = useAtom(showFavoritesOnlyAtom);

  return (
    <MovieGridContainer isEmpty={isEmpty || !!error}>
      {isEmpty || error ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="300px"
          width="100%"
          textAlign="center"
        >
          <MovieIcon
            sx={{ fontSize: 60, color: error ? "error.main" : "gray" }}
          />
          <Typography
            variant="h6"
            mt={2}
            color={error ? "error.main" : "text.secondary"}
          >
            {error
              ? `Error loading movies: ${error}`
              : showFavoritesOnly
              ? "No Favorites"
              : "No movies to display"}
          </Typography>
        </Box>
      ) : (
        movies.map((movie: Movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} onClick={() => onMovieClick(movie)} />
          </div>
        ))
      )}
    </MovieGridContainer>
  );
};

export default MovieGrid;
