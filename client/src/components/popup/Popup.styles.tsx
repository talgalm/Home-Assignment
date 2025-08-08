import { Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledPopupOverlay = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  backdropFilter: "blur(4px)",
  animation: "fadeIn 0.3s ease-out",
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
});

export const StyledPopup = styled(Box)<{
  size: "small" | "medium" | "large";
  $direction?: "ltr" | "rtl";
}>(({ size, $direction = "ltr" }) => ({
  backgroundColor: "rgba(20, 20, 20, 0.95)",
  borderRadius: "16px",
  padding: "24px", // used `theme.spacing(3)` originally
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  maxWidth: size === "small" ? "400px" : size === "large" ? "800px" : "600px",
  width: "90%",
  maxHeight: "80vh",
  overflow: "auto",
  animation: "slideIn 0.3s ease-out",
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
    borderRadius: "16px",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
    pointerEvents: "none",
  },
  "@keyframes slideIn": {
    from: {
      opacity: 0,
      transform: "translateY(-20px) scale(0.95)",
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
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(255, 255, 255, 0.3)",
    borderRadius: "4px",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.5)",
    },
  },
}));

export const StyledPopupContent = styled(Box)({
  position: "relative",
  zIndex: 1,
  color: "white",
  "& > *": {
    color: "white",
  },
});

export const StyledCloseButton = styled(IconButton)<{
  $direction?: "ltr" | "rtl";
}>(({ $direction = "ltr" }) => ({
  position: "absolute",
  top: "20px",
  right: $direction === "rtl" ? "auto" : "20px",
  left: $direction === "rtl" ? "20px" : "auto",
  zIndex: 10000,
  color: "rgba(255, 255, 255, 0.9)",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  backdropFilter: "blur(10px)",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "50%",
  width: "48px",
  height: "48px",
  transition: "all 0.3s ease",
  "& svg": {
    fontSize: "24px",
  },
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    transform: "scale(1.1)",
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));
