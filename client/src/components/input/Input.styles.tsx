import { TextField } from "@mui/material";
import { styled } from "styled-components";

export const StyledInput = styled(TextField)<{ $direction?: "ltr" | "rtl" }>(
  ({ $direction = "ltr" }) => ({
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

      "&.Mui-focused": {
        color: "#E50914",
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
  })
);
