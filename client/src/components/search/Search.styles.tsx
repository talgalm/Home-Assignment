import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    fontSize: "1.1rem",
    gap: 8,
    padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
    color: theme.palette.common.white,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    backdropFilter: "blur(10px)",

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    },

    "&.Mui-focused": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "2px solid #E50914",
      boxShadow: "0 0 0 4px rgba(229, 9, 20, 0.1)",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      padding: `${theme.spacing(2)} ${theme.spacing(1.5)}`,
    },
  },

  "& input::placeholder": {
    color: "rgba(255, 255, 255, 0.6)",
    opacity: 1,
    fontWeight: 400,
  },

  "& .MuiInputBase-input": {
    "&::placeholder": {
      opacity: 1,
      transition: "opacity 0.2s ease",
    },
    "&:focus::placeholder": {
      opacity: 0.7,
    },
  },

  "&:before, &:after, &:hover:before": {
    borderBottom: "none",
  },
}));
