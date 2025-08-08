import React from "react";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  StyledPopup,
  StyledPopupOverlay,
  StyledCloseButton,
} from "./Popup.styles";
import AddMovieForm from "../../movies/add-movie/AddMovie.form";
import EditMovieForm from "../../movies/edit-movie/EditMovie.form";
import { useLanguageDirection } from "../../hooks/useLanguageDirection";
import type { Movie } from "../../interfaces";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  size?: "small" | "medium" | "large";
  styleProps?: React.CSSProperties;
  movie?: Movie;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  size = "medium",
  styleProps,
  movie,
}) => {
  const direction = useLanguageDirection();
  if (!isOpen) return null;

  return (
    <StyledPopupOverlay onClick={onClose}>
      <StyledCloseButton $direction={direction} onClick={onClose}>
        <CloseIcon />
      </StyledCloseButton>

      <StyledPopup
        size={size}
        $direction={direction}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        sx={{
          ...styleProps,
        }}
      >
        {!movie ? (
          <AddMovieForm onClose={onClose} />
        ) : (
          <EditMovieForm movie={movie!} onSuccess={onClose} />
        )}
      </StyledPopup>
    </StyledPopupOverlay>
  );
};

export default Popup;
