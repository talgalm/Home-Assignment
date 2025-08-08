import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MovieIcon from "@mui/icons-material/Movie";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import CircularProgress from "@mui/material/CircularProgress";
import type { Movie } from "../../interfaces";
import {
  MovieCardContainer,
  StyledCard,
  PlaceholderBox,
  StyledCardContent,
  StyledCardActions,
  StyledGeneralTypography,
  GenersGeneralTypography,
} from "./MovieCard.styles";
import GeneralTypography from "../typography/Typography";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleFavorite, removeFavorite } from "../../store/favoritesSlice";
import type { RootState } from "../../store";
import { formatMovieTitle } from "../../utils/textUtils";
import { useDeleteMovie } from "../../hooks/useDeleteMovie";
import ConfirmDialog from "../confirm-dialog/ConfirmDialog";
import { CardMedia, IconButton } from "@mui/material";

type Props = {
  movie: Movie;
  onClick: (movie: Movie) => void;
  onEditClick: (movie: Movie) => void;
};

const MovieCard: React.FC<Props> = ({ movie, onClick, onEditClick }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const favorites = useAppSelector(
    (state: RootState) => state.favorites.movies
  );
  const isFavorite = favorites.some((favMovie) => favMovie.id === movie.id);
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
      },
    });
  };

  return (
    <MovieCardContainer>
      <StyledCard>
        {movie.img && movie.img !== "N/A" ? (
          <CardMedia
            component="img"
            sx={{ height: 150, objectFit: "cover" }}
            image={movie.img}
            alt={formatMovieTitle(movie.title)}
          />
        ) : (
          <PlaceholderBox>
            <MovieIcon sx={{ fontSize: 60, color: "gray" }} />
          </PlaceholderBox>
        )}

        <StyledCardContent>
          <div>
            <StyledGeneralTypography
              variant="h6"
              value={formatMovieTitle(movie.title)}
            />
            <GeneralTypography
              variant="body2"
              value={`${movie.year} ${
                movie.runtime !== "N/A" ? `• ${movie.runtime}` : ""
              }`}
              styleProps={{
                color: "text.secondary",
                marginBottom: 8,
              }}
            />
            <GenersGeneralTypography variant="body2" value={movie.genre} />
          </div>
        </StyledCardContent>

        <StyledCardActions>
          <IconButton
            color="primary"
            onClick={() => onEditClick(movie)}
            aria-label={t("Edit")}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => onClick(movie)}
            aria-label={t("Details")}
          >
            <InfoIcon />
          </IconButton>
          <IconButton
            color="primary"
            onClick={handleDeleteClick}
            disabled={deleteMovieMutation.isPending}
            aria-label={t("Delete")}
          >
            {deleteMovieMutation.isPending ? (
              <CircularProgress size={20} />
            ) : (
              <DeleteIcon />
            )}
          </IconButton>
          <IconButton
            color="primary"
            onClick={handleFavorite}
            aria-label={t("Favorite")}
          >
            {isFavorite ? <StarIcon /> : <StarOutlineIcon />}
          </IconButton>
        </StyledCardActions>
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
    </MovieCardContainer>
  );
};

export default MovieCard;
