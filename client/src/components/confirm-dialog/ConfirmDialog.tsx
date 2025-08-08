import React from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLanguageDirection } from "../../hooks/useLanguageDirection";
import GeneralButton from "../button/Button";
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions,
} from "./ConfirmDialog.styles";

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
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      dir={direction}
    >
      <StyledDialogTitle
        severityColor={`${getSeverityColor()}.main`}
        borderColor={`${getSeverityColor()}.light`}
      >
        {title}
      </StyledDialogTitle>

      <StyledDialogContent>
        <Typography variant="body1" color="text.primary">
          {message}
        </Typography>
      </StyledDialogContent>

      <StyledDialogActions>
        <GeneralButton
          variantType="cancel"
          text={cancelText || t("Common.cancel")}
          onClick={onClose}
        />
        <GeneralButton
          variantType="confirm"
          text={confirmText || t("Common.confirm")}
          onClick={handleConfirm}
        />
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default ConfirmDialog;
