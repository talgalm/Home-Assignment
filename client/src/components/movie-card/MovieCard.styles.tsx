import { styled } from "@mui/material/styles";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  Typography,
} from "@mui/material";

export const MovieCardContainer = styled("div")<{ $direction?: "ltr" | "rtl" }>(
  ({ $direction = "ltr" }) => ({
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    width: "100%",
    height: "100%",
    direction: $direction,
    textAlign: $direction === "rtl" ? "right" : "left",

    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
    },
  })
);

export const StyledCard = styled(Card)({
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

export const StyledCardMedia = styled(CardMedia)({
  height: 150,
  objectFit: "cover",
});

export const PlaceholderBox = styled(Box)({
  height: 150,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f5f5f5",
});

export const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const MovieTitle = styled(Typography)({
  fontWeight: 600,
  lineHeight: 1.3,
  marginBottom: 12,
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
});

export const MovieYearRuntime = styled(Typography)({
  color: "text.secondary",
});

export const MovieGenre = styled(Typography)({
  color: "text.secondary",
  variant: "body2",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const StyledCardActions = styled(CardActions)({
  justifyContent: "space-between",
  paddingLeft: 8,
  paddingRight: 8,
});
