import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTypography = styled(Typography)(() => ({
  fontWeight: 900,
  color: "#ffffff",
  textShadow: "0 4px 20px rgba(0,0,0,0.6)",
  letterSpacing: "-0.02em",
  fontFamily:
    "'Inter', 'Heebo', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
}));
