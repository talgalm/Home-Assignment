import React from "react";
import { Card, CardContent, Typography, CardMedia, Box } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import type { Movie } from "../../interfaces";
import { MovieCardContainer } from "./MovieCard.styles"; // or wherever it's defined

type Props = {
  movie: Movie;
};

const MovieCard: React.FC<Props> = ({ movie }) => {
  return (
    <MovieCardContainer>
      <Card
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" gutterBottom noWrap>
            {movie.title}
          </Typography>
          <Typography color="text.secondary">
            {movie.year} • {movie.runtime} min
          </Typography>
          <Typography color="text.secondary" variant="body2" noWrap>
            {movie.genre}
          </Typography>
        </CardContent>
      </Card>
    </MovieCardContainer>
  );
};

export default MovieCard;
