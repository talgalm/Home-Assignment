import { TextField } from "@mui/material";
import { styled } from "styled-components";

export const StyledInput = styled(TextField)<{ $direction?: "ltr" | "rtl" }>(
  ({ $direction = "ltr" }) => ({
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
        color: "rgba(255, 255, 255, 0.9)",
      },
    },

    "&.Mui-error .MuiOutlinedInput-root": {
      borderColor: "#f44336",
      "&:hover": {
        borderColor: "#f44336",
      },
      "&.Mui-focused": {
        borderColor: "#f44336",
        boxShadow: "0 0 0 2px rgba(244, 67, 54, 0.2)",
      },
    },

    "& .MuiFormHelperText-root": {
      marginLeft: "0",
      marginTop: "8px",
      fontSize: "12px",
      color: "#f44336",
      fontWeight: 500,
    },

    "& .MuiFormHelperText-root:not(.Mui-error)": {
      color: "rgba(255, 255, 255, 0.6)",
    },
  })
);
