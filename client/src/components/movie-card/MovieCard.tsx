import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  IconButton,
  CardActions,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import type { Movie } from "../../interfaces";
import { MovieCardContainer } from "./MovieCard.styles";

type Props = {
  movie: Movie;
  onClick: (movie: Movie) => void;
};

const MovieCard: React.FC<Props> = ({ movie, onClick }) => {
  const [favorite, setFavorite] = useState<boolean>();

  const handleFavorite = () => {
    setFavorite((prev) => !prev);
  };
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
          <Box>
            <Typography variant="h6" gutterBottom noWrap>
              {movie.title}
            </Typography>
            <Typography color="text.secondary">
              {movie.year} • {movie.runtime} min
            </Typography>
            <Typography color="text.secondary" variant="body2" noWrap>
              {movie.genre}
            </Typography>
          </Box>
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between", paddingX: 1 }}>
          <IconButton color="primary" onClick={() => onClick(movie)}>
            <EditIcon />
          </IconButton>
          <IconButton color="primary">
            <DeleteIcon />
          </IconButton>
          <IconButton color="primary" onClick={handleFavorite}>
            {favorite ? <StarIcon /> : <StarOutlineIcon />}
          </IconButton>
        </CardActions>
      </Card>
    </MovieCardContainer>
  );
};

export default MovieCard;
