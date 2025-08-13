import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledPopupOverlay = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  backdropFilter: "blur(8px)",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  animation: "fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
});

export const StyledPopup = styled(Box)<{
  size: "small" | "medium" | "large";
  $direction?: "ltr" | "rtl";
}>(({ size, $direction = "ltr" }) => ({
  borderRadius: "12px",
  padding: "32px",
  background: "linear-gradient(135deg, #141414 0%, #1a1a1a 100%)",
  boxShadow: "0 25px 80px rgba(0, 0, 0, 0.9)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  backdropFilter: "blur(20px)",
  maxWidth: size === "small" ? "450px" : size === "large" ? "900px" : "700px",
  width: "90%",
  maxHeight: "85vh",
  overflow: "auto",
  animation: "slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  direction: $direction,
  textAlign: $direction === "rtl" ? "right" : "left",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "12px",
    pointerEvents: "none",
  },
  "@keyframes slideIn": {
    from: {
      opacity: 0,
      transform: "translateY(-30px) scale(0.95)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0) scale(1)",
    },
  },
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#E50914",
    borderRadius: "4px",
    "&:hover": {
      background: "#ff1a1a",
    },
  },
}));

export const StyledPopupContent = styled(Box)({
  position: "relative",
  zIndex: 1,
  color: "#ffffff",
  "& > *": {
    color: "#ffffff",
  },
});

export const StyledCloseButton = styled(IconButton)<{
  $direction?: "ltr" | "rtl";
}>(({ $direction = "ltr" }) => ({
  position: "absolute",
  top: "24px",
  right: $direction === "rtl" ? "auto" : "24px",
  left: $direction === "rtl" ? "24px" : "auto",
  zIndex: 10000,
  color: "#ffffff",
  backgroundColor: "rgba(229, 9, 20, 0.9)",
  backdropFilter: "blur(10px)",
  border: "2px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "50%",
  width: "48px",
  height: "48px",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "0 4px 12px rgba(229, 9, 20, 0.4)",
  "& svg": {
    fontSize: "24px",
  },
  "&:hover": {
    backgroundColor: "#E50914",
    color: "#ffffff",
    transform: "scale(1.1)",
    borderColor: "rgba(255, 255, 255, 0.4)",
    boxShadow: "0 8px 20px rgba(229, 9, 20, 0.6)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));
