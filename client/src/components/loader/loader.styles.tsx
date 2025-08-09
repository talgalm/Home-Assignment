import { styled } from "@mui/material/styles";
import { Box, CircularProgress } from "@mui/material";

export const LoaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: theme.spacing(6), // 48px
  marginBottom: theme.spacing(6),
  "@media (max-width: 600px)": {
    marginTop: "100px"
  },
}));

export const LoaderSpinner = styled(CircularProgress)(() => ({
  color: "#f5c518",
  marginBottom: 16, // 2 * 8px spacing unit
}));
