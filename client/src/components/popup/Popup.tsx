import React from "react";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  StyledPopup,
  StyledPopupOverlay,
  StyledCloseButton,
} from "./Popup.styles";
import AddMovieForm from "../../movies/add-movie/AddMovie.form";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "small" | "medium" | "large";
  styleProps?: React.CSSProperties;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  title,
  size = "medium",
  styleProps,
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
        <AddMovieForm />
      </StyledPopup>
    </StyledPopupOverlay>
  );
};

export default Popup;
