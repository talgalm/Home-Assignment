import { styled } from "@mui/material/styles";
import { Card, CardMedia, CardContent, CardActions, Box } from "@mui/material";
import GeneralTypography from "../typography/Typography";

export const MovieCardContainer = styled("div")<{ $direction?: "ltr" | "rtl" }>(
  ({ $direction = "ltr" }) => ({
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    width: "100%",
    height: "100%",
    direction: $direction,
    textAlign: $direction === "rtl" ? "right" : "left",
    borderRadius: "8px",
    overflow: "hidden",

    "&:hover": {
      transform: "scale(1.05) translateY(-8px)",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
      zIndex: 10,
    },
  })
);

export const StyledCard = styled(Card)({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(135deg, #141414 0%, #1a1a1a 100%)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  overflow: "hidden",
  "&:hover": {
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
});

export const StyledCardMedia = styled(CardMedia)({
  height: 180, // Increased height for better proportions
  objectFit: "cover",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

export const PlaceholderBox = styled(Box)({
  height: 180,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)",
  color: "#666",
  fontSize: "0.9rem",
  fontWeight: 500,
});

export const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "16px",
  background: "linear-gradient(135deg, #141414 0%, #1a1a1a 100%)",
});

export const StyledCardActions = styled(CardActions)({
  justifyContent: "space-between",
  paddingLeft: 16,
  paddingRight: 16,
  paddingBottom: 16,
  background: "linear-gradient(135deg, #141414 0%, #1a1a1a 100%)",
});

export const StyledGeneralTypography = styled(GeneralTypography)({
  fontWeight: 700,
  lineHeight: 1.3,
  marginBottom: 8,
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  minHeight: "3rem",
  color: "#ffffff",
  fontSize: "1.1rem",
  letterSpacing: "-0.01em",
});

export const GenersGeneralTypography = styled(GeneralTypography)({
  color: "rgba(255, 255, 255, 0.7)",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  minHeight: "1.5rem",
  fontSize: "0.9rem",
  fontWeight: 500,
});
