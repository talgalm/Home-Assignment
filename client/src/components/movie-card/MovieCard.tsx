import React from "react";
import { Card, CardContent, Typography, CardMedia, Box } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import type { Movie } from "../../interfaces";

type Props = {
  movie: Movie;
};

const MovieCard: React.FC<Props> = ({ movie }) => {
  return (
    <Card>
      {movie.img ? (
        <CardMedia
          component="img"
          sx={{ height: 150, objectFit: "cover" }}
          image={movie.img}
          alt={movie.title}
        />
      ) : (
        <Box
          sx={{
            height: 150,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <MovieIcon sx={{ fontSize: 60, color: "gray" }} />
        </Box>
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {movie.title}
        </Typography>
        <Typography color="text.secondary">
          {movie.year} • {movie.runtime} min
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {movie.genre}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
