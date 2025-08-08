import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLanguageDirection } from "../../hooks/useLanguageDirection";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  severity?: "warning" | "error" | "info";
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  severity = "warning",
}) => {
  const { t } = useTranslation();
  const direction = useLanguageDirection();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const getSeverityColor = () => {
    switch (severity) {
      case "error":
        return "error";
      case "warning":
        return "warning";
      case "info":
        return "primary";
      default:
        return "warning";
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      dir={direction}
      PaperProps={{
        sx: {
          // background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          color: `${getSeverityColor()}.main`,
          fontWeight: "bold",
          borderBottom: `2px solid ${getSeverityColor()}.light`,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Typography variant="body1" color="text.primary">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: "rgba(0, 0, 0, 0.2)",
            color: "text.primary",
            "&:hover": {
              borderColor: "rgba(0, 0, 0, 0.4)",
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          {cancelText || t("Common.cancel")}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color={getSeverityColor()}
          sx={{
            fontWeight: "bold",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: 2,
            },
          }}
        >
          {confirmText || t("Common.confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
