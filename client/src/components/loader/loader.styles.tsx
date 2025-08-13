import { styled } from "@mui/material/styles";
import { Box, CircularProgress } from "@mui/material";

export const LoaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: theme.spacing(8), // 64px - increased for better spacing
  marginBottom: theme.spacing(8),
  padding: "40px",
  background: "linear-gradient(135deg, #141414 0%, #1a1a1a 100%)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
  "@media (max-width: 600px)": {
    marginTop: "120px",
    padding: "30px",
  },
}));

export const LoaderSpinner = styled(CircularProgress)(() => ({
  color: "#E50914", // Netflix red
  marginBottom: 24, // 3 * 8px spacing unit
  filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
}));
