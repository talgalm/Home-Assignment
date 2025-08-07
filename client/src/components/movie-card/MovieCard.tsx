import React from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import type { Movie } from "../../interfaces";
import { MovieCardContainer } from "./MovieCard.styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleFavorite } from "../../store/favoritesSlice";
import type { RootState } from "../../store";
import { formatMovieTitle } from "../../utils/textUtils";
import { useDeleteMovie } from "../../hooks/useDeleteMovie";
import { removeFavorite } from "../../store/favoritesSlice";

type Props = {
  movie: Movie;
  onClick: (movie: Movie) => void;
};

const MovieCard: React.FC<Props> = ({ movie, onClick }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(
    (state: RootState) => state.favorites.movies as Movie[]
  );
  const isFavorite = favorites.some(
    (favMovie: Movie) => favMovie.id === movie.id
  );
  const deleteMovieMutation = useDeleteMovie();

  const handleFavorite = () => {
    console.log("Toggling favorite for movie:", movie.id, movie.title);
    console.log("Current favorites:", favorites);
    dispatch(toggleFavorite(movie));
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${formatMovieTitle(movie.title)}"?`
      )
    ) {
      deleteMovieMutation.mutate(movie, {
        onSuccess: () => {
          // Also remove from favorites if it was favorited
          if (isFavorite) {
            dispatch(removeFavorite(movie.id));
          }
        },
      });
    }
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
            alt={formatMovieTitle(movie.title)}
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
              {formatMovieTitle(movie.title)}
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
          <IconButton
            color="primary"
            onClick={handleDelete}
            disabled={deleteMovieMutation.isPending}
          >
            {deleteMovieMutation.isPending ? (
              <CircularProgress size={20} />
            ) : (
              <DeleteIcon />
            )}
          </IconButton>
          <IconButton color="primary" onClick={handleFavorite}>
            {isFavorite ? <StarIcon /> : <StarOutlineIcon />}
          </IconButton>
        </CardActions>
      </Card>
    </MovieCardContainer>
  );
};

export default MovieCard;
