import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  color: "white",
  textShadow: "0 4px 20px rgba(0,0,0,0.5)",
  letterSpacing: "-0.03em",
  marginBottom: theme.spacing(2),
}));