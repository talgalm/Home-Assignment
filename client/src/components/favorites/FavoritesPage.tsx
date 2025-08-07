import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import MovieCard from "../movie-card/MovieCard";
import type { Movie } from "../../interfaces";

const FavoritesPage: React.FC = () => {
  const favorites = useAppSelector((state: any) => state.favorites.movies);

  const handleEdit = (movie: Movie) => {
    // Handle edit functionality
    console.log("Edit movie:", movie);
  };

  if (favorites.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Favorite Movies
        </Typography>
        <Typography variant="body1" color="text.secondary">
          No favorite movies yet. Start adding movies to your favorites!
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Favorite Movies ({favorites.length})
      </Typography>
      <Grid container spacing={3}>
        {favorites.map((movie: Movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} onClick={handleEdit} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FavoritesPage;
