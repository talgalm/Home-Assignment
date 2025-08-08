import styled from "@emotion/styled";
import { Box, Card, CardMedia, Chip, Divider, IconButton } from "@mui/material";
import GeneralTypography from "../typography/Typography";

export const StyledMovieDetail = styled.div<{ $direction?: "ltr" | "rtl" }>(
  ({ $direction = "ltr" }) => ({
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
    padding: 20,
    direction: $direction,
    textAlign: $direction === "rtl" ? "right" : "left",
    "@media (max-width: 768px)": {
      padding: 16,
    },
  })
);

export const BackButtonWrapper = styled(Box)({
  marginBottom: 24,
});

export const StyledCard = styled(Card)({
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: 24,
  overflow: "hidden",
});

export const PosterImage = styled(CardMedia)({
  height: 400,
  width: "100%",
  objectFit: "cover",
  "@media (max-width: 900px)": {
    height: 300,
  },
});

export const PosterPlaceholder = styled(Box)({
  height: 400,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  "@media (max-width: 900px)": {
    height: 300,
  },
});

export const ActionButtonsWrapper = styled(Box)({
  display: "flex",
  gap: 8,
  marginLeft: 16,
});

export const FavoriteButton = styled(IconButton)<{ $active?: boolean }>(
  ({ $active }) => ({
    color: $active ? "#f5c518" : "white",
    "&:hover": {
      backgroundColor: "rgba(245, 197, 24, 0.1)",
    },
  })
);

export const EditButton = styled(IconButton)({
  color: "white",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

export const DeleteButton = styled(IconButton)({
  color: "var(--mui-palette-primary-main)",
});

export const StyledDivider = styled(Divider)({
  margin: "24px 0",
  borderColor: "rgba(255, 255, 255, 0.2)",
});

export const GenreChip = styled(Chip)({
  backgroundColor: "rgba(245, 197, 24, 0.2)",
  color: "#f5c518",
  border: "1px solid rgba(245, 197, 24, 0.3)",
  "&:hover": {
    backgroundColor: "rgba(245, 197, 24, 0.3)",
  },
});

export const StyledGeneralTypography = styled(GeneralTypography)({
  fontWeight: 700,
  lineHeight: 1.2,
  color: "white",
  flex: 1,
  marginRight: 2,
});