import React from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  Chip,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Star as StarIcon,
  StarOutline as StarOutlineIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleFavorite, removeFavorite } from "../../store/favoritesSlice";
import { useDeleteMovie } from "../../hooks/useDeleteMovie";
import { useLanguageDirection } from "../../hooks/useLanguageDirection";
import { formatMovieTitle } from "../../utils/textUtils";
import type { Movie } from "../../interfaces";
import type { RootState } from "../../store";
import { StyledMovieDetail } from "./MovieDetail.styles";

interface MovieDetailProps {
  movie: Movie;
  onBack: () => void;
  onEdit: (movie: Movie) => void;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie, onBack, onEdit }) => {
  const { t } = useTranslation();
  const direction = useLanguageDirection();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(
    (state: RootState) => (state.favorites as any).movies as Movie[]
  );
  const isFavorite = favorites.some((fav: Movie) => fav.id === movie.id);
  const deleteMovieMutation = useDeleteMovie();

  const handleFavorite = () => {
    dispatch(toggleFavorite(movie));
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `${t("DeleteMovie.message")} "${formatMovieTitle(movie.title)}"?`
      )
    ) {
      deleteMovieMutation.mutate(movie, {
        onSuccess: () => {
          if (isFavorite) {
            dispatch(removeFavorite(movie.id));
          }
          onBack();
        },
      });
    }
  };

  const genres = movie.genre.split(", ").filter(Boolean);

  return (
    <StyledMovieDetail $direction={direction}>
      <Box sx={{ mb: 3 }}>
        <Button
          onClick={onBack}
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "rgba(255, 255, 255, 0.3)",
            "&:hover": {
              borderColor: "rgba(255, 255, 255, 0.5)",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          {t("Common.back")}
        </Button>
      </Box>

      <Card
        sx={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Grid container>
          {/* Movie Poster */}
          <Grid item xs={12} md={4}>
            {movie.img ? (
              <CardMedia
                component="img"
                sx={{
                  height: { xs: 300, md: 400 },
                  width: "100%",
                  objectFit: "cover",
                }}
                image={movie.img}
                alt={formatMovieTitle(movie.title)}
              />
            ) : (
              <Box
                sx={{
                  height: { xs: 300, md: 400 },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <Typography variant="h4" color="text.secondary">
                  🎬
                </Typography>
              </Box>
            )}
          </Grid>

          {/* Movie Details */}
          <Grid item xs={12} md={8}>
            <Box sx={{ p: 3 }}>
              {/* Header with Actions */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: "white",
                      lineHeight: 1.2,
                    }}
                  >
                    {formatMovieTitle(movie.title)}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
                    <IconButton
                      onClick={handleFavorite}
                      sx={{
                        color: isFavorite ? "#f5c518" : "white",
                        "&:hover": {
                          backgroundColor: "rgba(245, 197, 24, 0.1)",
                        },
                      }}
                    >
                      {isFavorite ? (
                        <StarIcon color="primary" />
                      ) : (
                        <StarOutlineIcon color="primary" />
                      )}
                    </IconButton>
                    <IconButton
                      onClick={() => onEdit(movie)}
                      sx={{
                        color: "white",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton
                      onClick={handleDelete}
                      color="primary"
                      disabled={deleteMovieMutation.isPending}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {movie.year} • {movie.runtime} {t("MovieCard.minutes")}
                  </Typography>
                </Box>
              </Box>

              <Divider
                sx={{ my: 3, borderColor: "rgba(255, 255, 255, 0.2)" }}
              />

              {/* Movie Information */}
              <Grid container spacing={3}>
                {/* Director */}
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {t("MovieCard.director")}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "white" }}>
                    {movie.director}
                  </Typography>
                </Grid>

                {/* Genres */}
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {t("MovieCard.genre")}
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {genres.map((genre, index) => (
                      <Chip
                        key={index}
                        label={genre}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(245, 197, 24, 0.2)",
                          color: "#f5c518",
                          border: "1px solid rgba(245, 197, 24, 0.3)",
                          "&:hover": {
                            backgroundColor: "rgba(245, 197, 24, 0.3)",
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Grid>

                {/* Year */}
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {t("MovieCard.year")}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "white" }}>
                    {movie.year}
                  </Typography>
                </Grid>

                {/* Runtime */}
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {t("MovieCard.runtime")}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "white" }}>
                    {movie.runtime} {t("MovieCard.minutes")}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </StyledMovieDetail>
  );
};

export default MovieDetail;
