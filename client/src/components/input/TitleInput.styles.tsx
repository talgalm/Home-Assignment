import styled from "styled-components";
import { Box } from "@mui/material";

export const TitleInputContainer = styled(Box)<{ $direction?: "ltr" | "rtl" }>(
  ({ $direction = "ltr" }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
    direction: $direction,
    textAlign: $direction === "rtl" ? "right" : "left",
  })
);

export const TitleStatus = styled(Box)<{ color: string }>(({ color }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
  padding: "6px 12px",
  borderRadius: "6px",
  backgroundColor:
    color === "error"
      ? "rgba(229, 9, 20, 0.15)"
      : color === "success"
      ? "rgba(70, 211, 105, 0.15)"
      : color === "warning"
      ? "rgba(232, 124, 3, 0.15)"
      : "rgba(0, 113, 235, 0.15)",
  color:
    color === "error"
      ? "#E50914"
      : color === "success"
      ? "#46d369"
      : color === "warning"
      ? "#e87c03"
      : "#0071eb",
  border: `1px solid ${
    color === "error"
      ? "rgba(229, 9, 20, 0.3)"
      : color === "success"
      ? "rgba(70, 211, 105, 0.3)"
      : color === "warning"
      ? "rgba(232, 124, 3, 0.3)"
      : "rgba(0, 113, 235, 0.3)"
  }`,
  fontWeight: 600,
  transition: "all 0.2s ease",
  "& .MuiSvgIcon-root": {
    fontSize: "18px",
  },
  "& span": {
    fontSize: "13px",
    fontWeight: 600,
  },
}));
