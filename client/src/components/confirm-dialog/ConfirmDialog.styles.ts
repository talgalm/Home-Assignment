import { styled, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

export const StyledDialog = styled(Dialog)(() => ({
  "& .MuiPaper-root": {
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
  },
}));

export const StyledDialogTitle = styled(DialogTitle, {
  shouldForwardProp: (prop) => prop !== "severityColor" && prop !== "borderColor",
})<{ severityColor: string; borderColor: string }>(({ severityColor, borderColor }) => ({
  color: severityColor,
  fontWeight: "bold",
  borderBottom: `2px solid ${borderColor}`,
}));

export const StyledDialogContent = styled(DialogContent)(() => ({
  paddingTop: 16,
}));

export const StyledDialogActions = styled(DialogActions)(() => ({
  padding: 16,
  gap: 8,
}));