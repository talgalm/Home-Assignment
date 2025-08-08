import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, CardMedia } from "@mui/material";
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
import GeneralButton from "../button/Button";
import ConfirmDialog from "../confirm-dialog/ConfirmDialog";
import {
  StyledMovieDetail,
  BackButtonWrapper,
  StyledCard,
  PosterPlaceholder,
  MovieTitle,
  ActionButtonsWrapper,
  FavoriteButton,
  EditButton,
  DeleteButton,
  StyledYearRuntime,
  StyledDivider,
  InfoLabel,
  InfoValue,
  GenreChip,
} from "./MovieDetail.styles";

interface MovieDetailProps {
  movie: Movie;
  onBack: () => void;
  onEdit: (movie: Movie) => void;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie, onBack, onEdit }) => {
  const { t } = useTranslation();
  const direction = useLanguageDirection();
  const dispatch = useAppDispatch();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const favorites = useAppSelector(
    (state: RootState) => state.favorites.movies
  );
  const isFavorite = favorites.some((fav: Movie) => fav.id === movie.id);
  const deleteMovieMutation = useDeleteMovie();

  const handleFavorite = () => {
    dispatch(toggleFavorite(movie));
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    deleteMovieMutation.mutate(movie, {
      onSuccess: () => {
        if (isFavorite) {
          dispatch(removeFavorite(movie.id));
        }
        onBack();
      },
    });
  };

  const genres = movie.genre.split(", ").filter(Boolean);

  return (
    <StyledMovieDetail $direction={direction}>
      <BackButtonWrapper>
        <GeneralButton
          variantType="back"
          text={t("Common.back")}
          onClick={onBack}
        />
      </BackButtonWrapper>

      <StyledCard>
        <Box
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "33.33%" },
              minHeight: { xs: "300px", md: "auto" },
            }}
          >
            {movie.img ? (
              <CardMedia
                component="img"
                image={movie.img}
                alt={formatMovieTitle(movie.title)}
              />
            ) : (
              <PosterPlaceholder>
                <Box component="span" sx={{ fontSize: 48 }}>
                  🎬
                </Box>
              </PosterPlaceholder>
            )}
          </Box>

          <Box sx={{ width: { xs: "100%", md: "66.67%" }, p: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
              mb={2}
            >
              <Box flex={1}>
                <MovieTitle variant="h3">
                  {formatMovieTitle(movie.title)}
                </MovieTitle>
                <ActionButtonsWrapper>
                  <FavoriteButton onClick={handleFavorite} $active={isFavorite}>
                    {isFavorite ? (
                      <StarIcon color="primary" />
                    ) : (
                      <StarOutlineIcon color="primary" />
                    )}
                  </FavoriteButton>
                  <EditButton onClick={() => onEdit(movie)}>
                    <EditIcon color="primary" />
                  </EditButton>
                  <DeleteButton
                    onClick={handleDeleteClick}
                    disabled={deleteMovieMutation.isPending}
                  >
                    <DeleteIcon />
                  </DeleteButton>
                </ActionButtonsWrapper>
                <StyledYearRuntime variant="h6" color="text.secondary">
                  {movie.year} • {movie.runtime} {t("MovieCard.minutes")}
                </StyledYearRuntime>
              </Box>
            </Box>

            <StyledDivider />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 3,
                mt: 3,
              }}
            >
              <Box>
                <InfoLabel variant="subtitle2" color="text.secondary">
                  {t("MovieCard.director")}
                </InfoLabel>
                <InfoValue variant="body1">{movie.director}</InfoValue>
              </Box>

              <Box>
                <InfoLabel variant="subtitle2" color="text.secondary">
                  {t("MovieCard.genre")}
                </InfoLabel>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {genres.map((genre, index) => (
                    <GenreChip key={index} label={genre} size="small" />
                  ))}
                </Box>
              </Box>

              <Box>
                <InfoLabel variant="subtitle2" color="text.secondary">
                  {t("MovieCard.year")}
                </InfoLabel>
                <InfoValue variant="body1">{movie.year}</InfoValue>
              </Box>

              <Box>
                <InfoLabel variant="subtitle2" color="text.secondary">
                  {t("MovieCard.runtime")}
                </InfoLabel>
                <InfoValue variant="body1">
                  {movie.runtime} {t("MovieCard.minutes")}
                </InfoValue>
              </Box>
            </Box>
          </Box>
        </Box>
      </StyledCard>

      <ConfirmDialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteConfirm}
        title={t("DeleteMovie.title")}
        message={`${t("DeleteMovie.message")} "${formatMovieTitle(
          movie.title
        )}"?`}
        confirmText={t("DeleteMovie.confirm")}
        cancelText={t("DeleteMovie.cancel")}
        severity="warning"
      />
    </StyledMovieDetail>
  );
};

export default MovieDetail;
