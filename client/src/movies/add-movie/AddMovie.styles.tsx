import { styled } from "@mui/material/styles";
import { Box, Button, Autocomplete } from "@mui/material";

export const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
  padding: "20px 0",
});

export const StyledSubmitButton = styled(Button)({
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  color: "white",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "12px",
  padding: "16px 32px",
  fontSize: "16px",
  fontWeight: 600,
  textTransform: "none",
  backdropFilter: "blur(10px)",
  transition: "all 0.3s ease",
  marginTop: "10px",

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderColor: "rgba(255, 255, 255, 0.5)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
  },

  "&:active": {
    transform: "translateY(0)",
  },

  "&:disabled": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "rgba(255, 255, 255, 0.5)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    transform: "none",
    boxShadow: "none",
  },
});

export const FormTitle = styled("h2")({
  color: "white",
  fontSize: "1.8rem",
  fontWeight: 700,
  margin: "0 0 30px 0",
  textAlign: "center",
  textShadow: "0 2px 10px rgba(0,0,0,0.3)",
  letterSpacing: "-0.02em",
});

export const FormContainer = styled(Box)({
  width: "100%",
  maxWidth: "500px",
  margin: "0 auto",
});

export const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "white",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease",

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      borderColor: "rgba(255, 255, 255, 0.3)",
    },

    "&.Mui-focused": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderColor: "rgba(255, 255, 255, 0.5)",
      boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.1)",
    },
  },

  "& .MuiOutlinedInput-input": {
    color: "white",
    fontSize: "16px",
    padding: "16px 20px",

    "&::placeholder": {
      color: "rgba(255, 255, 255, 0.6)",
      opacity: 1,
    },
  },

  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },

  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "14px",

    "&.Mui-focused": {
      color: "rgba(255, 255, 255, 0.9)",
    },
  },

  "& .MuiAutocomplete-popupIndicator": {
    color: "rgba(255, 255, 255, 0.7)",
  },

  "& .MuiAutocomplete-clearIndicator": {
    color: "rgba(255, 255, 255, 0.7)",
  },

  "& .MuiChip-root": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    "& .MuiChip-deleteIcon": {
      color: "rgba(255, 255, 255, 0.7)",
      "&:hover": {
        color: "white",
      },
    },
  },

  "& .MuiAutocomplete-paper": {
    backgroundColor: "rgba(20, 20, 20, 0.95)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "12px",
    marginTop: "4px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)",

    "& .MuiAutocomplete-option": {
      color: "white",
      "&[data-focus='true']": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
      "&[aria-selected='true']": {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
      },
    },
  },
});
