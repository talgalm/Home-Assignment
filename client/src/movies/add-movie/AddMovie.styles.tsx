import { styled } from "@mui/material/styles";
import { Box, Button, Autocomplete } from "@mui/material";
import GeneralTypography from "../../components/typography/Typography";

export const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  width: "100%",
  padding: "24px 0",
});

export const StyledSubmitButton = styled(Button)({
  background: "linear-gradient(135deg, #E50914 0%, #ff1a1a 100%)",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  padding: "16px 32px",
  fontSize: "16px",
  fontWeight: 700,
  textTransform: "none",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  marginTop: "16px",
  boxShadow: "0 4px 12px rgba(229, 9, 20, 0.3)",

  "&:hover": {
    background: "linear-gradient(135deg, #ff1a1a 0%, #E50914 100%)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(229, 9, 20, 0.4)",
  },

  "&:active": {
    transform: "translateY(0)",
  },

  "&:disabled": {
    background: "rgba(255, 255, 255, 0.1)",
    color: "rgba(255, 255, 255, 0.5)",
    transform: "none",
    boxShadow: "none",
  },
});

export const FormContainer = styled(Box)<{ $direction?: "ltr" | "rtl" }>(
  ({ $direction = "ltr" }) => ({
    width: "100%",
    maxWidth: "550px",
    margin: "0 auto",
    direction: $direction,
    textAlign: $direction === "rtl" ? "right" : "left",
    padding: "32px",
    background: "linear-gradient(135deg, #141414 0%, #1a1a1a 100%)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
  })
);

export const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#ffffff",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      borderColor: "rgba(255, 255, 255, 0.2)",
      transform: "translateY(-1px)",
    },

    "&.Mui-focused": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderColor: "#E50914",
      boxShadow: "0 0 0 4px rgba(229, 9, 20, 0.1)",
    },
  },

  "& .MuiOutlinedInput-input": {
    color: "#ffffff",
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
      color: "#E50914",
    },
  },

  "& .MuiAutocomplete-popupIndicator": {
    color: "rgba(255, 255, 255, 0.7)",
  },

  "& .MuiAutocomplete-clearIndicator": {
    color: "rgba(255, 255, 255, 0.7)",
  },

  "& .MuiChip-root": {
    backgroundColor: "rgba(229, 9, 20, 0.15)",
    color: "#E50914",
    border: "1px solid rgba(229, 9, 20, 0.3)",
    fontWeight: 600,
    "& .MuiChip-deleteIcon": {
      color: "rgba(229, 9, 20, 0.7)",
      "&:hover": {
        color: "#E50914",
      },
    },
  },

  "& .MuiAutocomplete-paper": {
    backgroundColor: "rgba(20, 20, 20, 0.95)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "12px",
    marginTop: "8px",
    boxShadow: "0 16px 40px rgba(0, 0, 0, 0.8)",

    "& .MuiAutocomplete-option": {
      color: "#ffffff",
      "&[data-focus='true']": {
        backgroundColor: "rgba(229, 9, 20, 0.1)",
      },
      "&[aria-selected='true']": {
        backgroundColor: "rgba(229, 9, 20, 0.2)",
      },
    },
  },
});

export const StyledGeneralTypography = styled(GeneralTypography)({
  color: "#E50914",
  fontSize: "2rem",
  fontWeight: 800,
  margin: "0 0 32px 0",
  textAlign: "center",
  textShadow: "0 4px 12px rgba(229, 9, 20, 0.4)",
  letterSpacing: "-0.02em",
});
