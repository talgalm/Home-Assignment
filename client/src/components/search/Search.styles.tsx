import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    fontSize: "1rem", // smaller than 1.2rem
    padding: `${theme.spacing(2.5)} ${theme.spacing(1.5)}`,
    color: theme.palette.common.white,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.95rem",
      padding: `${theme.spacing(2)} ${theme.spacing(1.25)}`,
    },
  },
  "& input::placeholder": {
    color: "rgba(255, 255, 255, 0.5)",
    opacity: 1,
  },
  "&:before, &:after, &:hover:before": {
    borderBottom: "none",
  },
}));