import { styled } from "@mui/material/styles";
import { Card, CardMedia, CardContent, CardActions, Box } from "@mui/material";
import GeneralTypography from "../typography/Typography";

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

export const StyledCardActions = styled(CardActions)({
  justifyContent: "space-between",
  paddingLeft: 8,
  paddingRight: 8,
});

export const StyledGeneralTypography = styled(GeneralTypography)({
  fontWeight: 600,
  lineHeight: 1.3,
  marginBottom: 8,
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  minHeight: "3rem",
});

export const GenersGeneralTypography = styled(GeneralTypography)({
  color: "text.secondary",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  minHeight: "1.5rem",
});