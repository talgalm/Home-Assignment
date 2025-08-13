import { styled } from "@mui/material/styles";
import { Autocomplete as MuiAutocomplete } from "@mui/material";

export const StyledAutocomplete = styled(MuiAutocomplete)<{
  $direction?: "ltr" | "rtl";
}>(({ $direction = "ltr" }) => ({
  direction: $direction,

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
    direction: $direction,
    textAlign: $direction === "rtl" ? "right" : "left",

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
    direction: $direction,
    textAlign: $direction === "rtl" ? "right" : "left",
    transformOrigin: $direction === "rtl" ? "top right" : "top left",

    "&.Mui-focused": {
      color: "#E50914",
    },
  },

  "& .MuiInputLabel-shrink": {
    direction: $direction,
    textAlign: $direction === "rtl" ? "right" : "left",
    transformOrigin: $direction === "rtl" ? "top right" : "top left",
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
    direction: $direction,
    textAlign: $direction === "rtl" ? "right" : "left",
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
    direction: $direction,
    textAlign: $direction === "rtl" ? "right" : "left",

    "& .MuiAutocomplete-option": {
      color: "#ffffff",
      direction: $direction,
      textAlign: $direction === "rtl" ? "right" : "left",
      "&[data-focus='true']": {
        backgroundColor: "rgba(229, 9, 20, 0.1)",
      },
      "&[aria-selected='true']": {
        backgroundColor: "rgba(229, 9, 20, 0.2)",
      },
    },
  },

  "&.Mui-error .MuiOutlinedInput-root": {
    borderColor: "#E50914",
    "&:hover": {
      borderColor: "#E50914",
    },
    "&.Mui-focused": {
      borderColor: "#E50914",
      boxShadow: "0 0 0 4px rgba(229, 9, 20, 0.2)",
    },
  },

  "& .MuiFormHelperText-root": {
    marginLeft: "0",
    marginTop: "8px",
    fontSize: "12px",
    color: "#E50914",
    fontWeight: 500,
  },

  "& .MuiFormHelperText-root:not(.Mui-error)": {
    color: "rgba(255, 255, 255, 0.6)",
  },
}));
