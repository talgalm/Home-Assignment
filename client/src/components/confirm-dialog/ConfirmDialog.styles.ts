import { styled, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

export const StyledDialog = styled(Dialog)(() => ({
  "& .MuiPaper-root": {
    background: "linear-gradient(135deg, #141414 0%, #1a1a1a 100%)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    boxShadow: "0 25px 80px rgba(0, 0, 0, 0.9)",
  },
}));

export const StyledDialogTitle = styled(DialogTitle, {
  shouldForwardProp: (prop) => prop !== "severityColor" && prop !== "borderColor",
})<{ severityColor: string; borderColor: string }>(({ severityColor, borderColor }) => ({
  color: severityColor,
  fontWeight: 700,
  borderBottom: `2px solid ${borderColor}`,
  padding: "24px 24px 20px 24px",
  fontSize: "1.3rem",
  letterSpacing: "-0.01em",
}));

export const StyledDialogContent = styled(DialogContent)(() => ({
  paddingTop: 20,
  paddingLeft: 24,
  paddingRight: 24,
  paddingBottom: 8,
}));

export const StyledDialogActions = styled(DialogActions)(() => ({
  padding: "20px 24px 24px 24px",
  gap: 12,
}));