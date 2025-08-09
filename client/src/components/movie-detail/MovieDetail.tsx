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
  ActionButtonsWrapper,
  FavoriteButton,
  EditButton,
  DeleteButton,
  StyledDivider,
  GenreChip,
  StyledGeneralTypography,
} from "./MovieDetail.styles";
import GeneralTypography from "../typography/Typography";
import { useAtom } from "jotai";
import { userAtom } from "../../store/userAtom";
import UsernameDialog from "../username-dialog/UsernameDialog";
import { useUsernameDialog } from "../../hooks/useUsernameDialog";

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
  const [user] = useAtom(userAtom);
  const { isOpen, openDialog, closeDialog, handleSuccess } =
    useUsernameDialog();
  const isFavorite = favorites.some((fav: Movie) => fav.id === movie.id);
  const deleteMovieMutation = useDeleteMovie();

  const handleFavorite = () => {
    if (user) {
      dispatch(toggleFavorite(movie));
    } else {
      openDialog(() => dispatch(toggleFavorite(movie)));
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
        if (isFavorite) dispatch(removeFavorite(movie.id));
        onBack();
      },
    });
  };

  const genres = movie.genre.split(", ").filter(Boolean);

  const runtimeValue = `${movie.year} • ${
    movie.runtime.includes("min")
      ? movie.runtime.replace("min", t("MovieCard.minutes"))
      : movie.runtime + " " + t("MovieCard.minutes")
  }`;

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
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 4 },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "33.33%" },
              minHeight: { xs: 300, md: "auto" },
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 3,
              backgroundColor: "#222",
            }}
          >
            {movie.img && movie.img !== "N/A" ? (
              <CardMedia
                component="img"
                image={movie.img}
                alt={formatMovieTitle(movie.title)}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <PosterPlaceholder>
                <Box component="span" sx={{ fontSize: 48 }}>
                  🎬
                </Box>
              </PosterPlaceholder>
            )}
          </Box>

          <Box
            sx={{
              width: { xs: "100%", md: "66.67%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              color: "white",
              p: { xs: 0, md: 2 },
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 1.5,
                  padding: 2,
                }}
              >
                <StyledGeneralTypography
                  variant="h3"
                  value={formatMovieTitle(movie.title)}
                />

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
                    <DeleteIcon color="primary" />
                  </DeleteButton>
                </ActionButtonsWrapper>
              </Box>
              <GeneralTypography
                variant="h6"
                value={runtimeValue}
                styleProps={{
                  color: "text.secondary",
                  padding: 2,
                }}
              />

              <StyledDivider />
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 3,
                mt: 3,
                padding: 2,
              }}
            >
              <Box>
                <GeneralTypography
                  variant="subtitle2"
                  value={t("MovieCard.director")}
                  styleProps={{ color: "text.secondary" }}
                />
                <GeneralTypography variant="body1" value={movie.director} />
              </Box>

              <Box>
                <GeneralTypography
                  variant="subtitle2"
                  value={t("MovieCard.genre")}
                  styleProps={{ color: "text.secondary" }}
                />
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {genres.map((genre, idx) => (
                    <GenreChip key={idx} label={genre} size="small" />
                  ))}
                </Box>
              </Box>

              <Box>
                <GeneralTypography
                  variant="subtitle2"
                  value={t("MovieCard.year")}
                  styleProps={{ color: "text.secondary" }}
                />
                <GeneralTypography variant="body1" value={movie.year} />
              </Box>

              <Box>
                <GeneralTypography
                  variant="subtitle2"
                  value={t("MovieCard.runtime")}
                  styleProps={{ color: "text.secondary" }}
                />
                <GeneralTypography variant="body1" value={`${movie.runtime}`} />
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

      <UsernameDialog
        open={isOpen}
        onClose={closeDialog}
        onSuccess={handleSuccess}
      />
    </StyledMovieDetail>
  );
};

export default MovieDetail;
