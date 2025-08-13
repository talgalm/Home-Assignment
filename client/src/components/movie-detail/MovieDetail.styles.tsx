import styled from "@emotion/styled";
import { Box, Card, Chip, Divider, IconButton } from "@mui/material";
import GeneralTypography from "../typography/Typography";

export const StyledMovieDetail = styled("div")<{ $direction?: "ltr" | "rtl" }>(
  ({ $direction = "ltr" }) => ({
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
    padding: 24,
    direction: $direction,
    textAlign: $direction === "rtl" ? "right" : "left",
    "@media (max-width: 768px)": {
      padding: 20,
      marginTop: 70,
    },
  })
);

export const BackButtonWrapper = styled(Box)(() => ({
  marginBottom: 32,
}));

export const StyledCard = styled(Card)(() => ({
  background: "linear-gradient(135deg, #141414 0%, #1a1a1a 100%)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: 16,
  overflow: "hidden",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
}));

export const PosterPlaceholder = styled(Box)(() => ({
  height: 450,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)",
  color: "#666",
  fontSize: "1rem",
  fontWeight: 500,
  "@media (max-width: 900px)": {
    height: 350,
  },
}));

export const ActionButtonsWrapper = styled(Box)({
  display: "flex",
  gap: 12,
  marginLeft: 20,
  "@media (max-width: 600px)": {
    flexDirection: "column",
    gap: 8,
  },
});

export const FavoriteButton = styled(IconButton)<{ $active?: boolean }>(
  ({ $active }) => ({
    color: $active ? "#E50914" : "#ffffff",
    backgroundColor: $active
      ? "rgba(229, 9, 20, 0.1)"
      : "rgba(255, 255, 255, 0.05)",
    border: `2px solid ${$active ? "#E50914" : "rgba(255, 255, 255, 0.2)"}`,
    borderRadius: "8px",
    padding: "12px",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      backgroundColor: $active
        ? "rgba(229, 9, 20, 0.2)"
        : "rgba(255, 255, 255, 0.1)",
      transform: "translateY(-2px)",
      boxShadow: $active
        ? "0 8px 20px rgba(229, 9, 20, 0.4)"
        : "0 8px 20px rgba(0, 0, 0, 0.3)",
    },
  })
);

export const EditButton = styled(IconButton)(() => ({
  color: "#ffffff",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  border: "2px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "8px",
  padding: "12px",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
  },
}));

export const DeleteButton = styled(IconButton)(() => ({
  color: "#E50914",
  backgroundColor: "rgba(229, 9, 20, 0.1)",
  border: "2px solid rgba(229, 9, 20, 0.3)",
  borderRadius: "8px",
  padding: "12px",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor: "rgba(229, 9, 20, 0.2)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 20px rgba(229, 9, 20, 0.4)",
  },
}));

export const StyledDivider = styled(Divider)(() => ({
  margin: "32px 0",
  borderColor: "rgba(255, 255, 255, 0.1)",
  borderWidth: "1px",
}));

export const GenreChip = styled(Chip)(() => ({
  backgroundColor: "rgba(229, 9, 20, 0.15)",
  color: "#E50914",
  border: "1px solid rgba(229, 9, 20, 0.3)",
  fontWeight: 600,
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: "rgba(229, 9, 20, 0.25)",
    transform: "translateY(-1px)",
  },
}));

export const StyledGeneralTypography = styled(GeneralTypography)(() => ({
  fontWeight: 700,
  lineHeight: 1.3,
  color: "#ffffff",
  flex: 1,
  marginRight: 2,
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
}));
