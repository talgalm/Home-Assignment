import React from "react";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  StyledPopup,
  StyledPopupOverlay,
  StyledCloseButton,
} from "./Popup.styles";
import AddMovieForm from "../../movies/add-movie/AddMovie.form";
import EditMovieForm from "../../movies/edit-movie/EditMovie.form";
import type { Movie } from "../../interfaces";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "small" | "medium" | "large";
  styleProps?: React.CSSProperties;
  mode?: "add" | "edit";
  movie?: Movie
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  title,
  size = "medium",
  styleProps,
  mode = "add",
  movie,
}) => {
  if (!isOpen) return null;

  return (
    <StyledPopupOverlay onClick={onClose}>
      <StyledCloseButton onClick={onClose}>
        <CloseIcon />
      </StyledCloseButton>

      <StyledPopup
        size={size}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        sx={{
          ...styleProps,
        }}
      >
        {!movie ? (
          <AddMovieForm onClose={onClose}/>
        ) : (
          <EditMovieForm movie={movie!} onSuccess={onClose} />
        )}
      </StyledPopup>
    </StyledPopupOverlay>
  );
};

export default Popup;
