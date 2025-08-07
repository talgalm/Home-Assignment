import styled from "styled-components";
import { Box } from "@mui/material";

export const TitleInputContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  width: "100%",
});

export const TitleStatus = styled(Box)<{ color: string }>(({ color }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
  padding: "4px 8px",
  borderRadius: "4px",
  backgroundColor:
    color === "error"
      ? "rgba(244, 67, 54, 0.1)"
      : color === "success"
      ? "rgba(76, 175, 80, 0.1)"
      : color === "warning"
      ? "rgba(255, 152, 0, 0.1)"
      : "rgba(33, 150, 243, 0.1)",
  color:
    color === "error"
      ? "#f44336"
      : color === "success"
      ? "#4caf50"
      : color === "warning"
      ? "#ff9800"
      : "#2196f3",
  border: `1px solid ${
    color === "error"
      ? "rgba(244, 67, 54, 0.3)"
      : color === "success"
      ? "rgba(76, 175, 80, 0.3)"
      : color === "warning"
      ? "rgba(255, 152, 0, 0.3)"
      : "rgba(33, 150, 243, 0.3)"
  }`,
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
  },
  "& span": {
    fontSize: "12px",
    fontWeight: 500,
  },
}));
