import React from "react";
import { MovieGridContainer } from "./MovieGrid.styles";
import type { Movie } from "../../interfaces";
import MovieCard from "../movie-card/MovieCard";

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onMovieClick }) => {
  return (
    <MovieGridContainer>
      {movies?.map((movie: Movie) => (
        <div key={movie.id}>
          <MovieCard movie={movie} onClick={() => onMovieClick(movie)} />
        </div>
      ))}
    </MovieGridContainer>
  );
};

export default MovieGrid;
