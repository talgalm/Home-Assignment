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
import { useAppDispatch } from "../../store/hooks";
import { removeFavorite } from "../../store/favoritesSlice";
import { formatMovieTitle } from "../../utils/textUtils";
import { useFavorites } from "../../hooks/useFavorites";
import { useDeleteMovie } from "../../hooks/useDeleteMovie";
import ConfirmDialog from "../confirm-dialog/ConfirmDialog";
import { CardMedia, IconButton } from "@mui/material";
import { useAtom } from "jotai";
import { userAtom } from "../../store/userAtom";
import UsernameDialog from "../username-dialog/UsernameDialog";
import { useUsernameDialog } from "../../hooks/useUsernameDialog";

type Props = {
  movie: Movie;
  onClick: (movie: Movie) => void;
  onEditClick: (movie: Movie) => void;
};

const MovieCard: React.FC<Props> = ({ movie, onClick, onEditClick }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [user] = useAtom(userAtom);
  const { isOpen, openDialog, closeDialog, handleSuccess } =
    useUsernameDialog();

  const { isFavorite, toggleFavoriteWithBackend, isTogglingFavorite } =
    useFavorites();
  const isMovieFavorite = isFavorite(movie.id);
  const isToggling = isTogglingFavorite(movie.id);
  const deleteMovieMutation = useDeleteMovie();

  const handleFavorite = async () => {
    if (user) {
      try {
        await toggleFavoriteWithBackend(movie);
      } catch (error) {
        console.error("Failed to toggle favorite:", error);
      }
    } else {
      openDialog(async () => {
        try {
          await toggleFavoriteWithBackend(movie);
        } catch (error) {
          console.error("Failed to toggle favorite:", error);
        }
      });
    }
  };

  const handleDeleteClick = () => {
    if (user) {
      setShowDeleteConfirm(true);
    } else {
      openDialog(() => setShowDeleteConfirm(true));
    }
  };

  const handleDeleteConfirm = () => {
    deleteMovieMutation.mutate(movie, {
      onSuccess: () => {
        if (isMovieFavorite) {
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
            disabled={isToggling}
            aria-label={t("Favorite")}
          >
            {isToggling ? (
              <CircularProgress size={20} />
            ) : isMovieFavorite ? (
              <StarIcon />
            ) : (
              <StarOutlineIcon />
            )}
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

      <UsernameDialog
        open={isOpen}
        onClose={closeDialog}
        onSuccess={handleSuccess}
      />
    </MovieCardContainer>
  );
};

export default MovieCard;
