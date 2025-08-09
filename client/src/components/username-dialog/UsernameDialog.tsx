import React, { useState } from "react";
import GeneralTypography from "../typography/Typography";
import { useTranslation } from "react-i18next";
import { useLanguageDirection } from "../../hooks/useLanguageDirection";
import GeneralButton from "../button/Button";
import { TextField } from "@mui/material";
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions,
} from "../confirm-dialog/ConfirmDialog.styles";
import { ApiService, type User } from "../../api/apiService";
import { useAtom } from "jotai";
import { userAtom } from "../../store/userAtom";

interface UsernameDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: (user: User) => void;
}

const UsernameDialog: React.FC<UsernameDialogProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const direction = useLanguageDirection();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [, setUser] = useAtom(userAtom);

  const handleSave = async () => {
    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const newUser = await ApiService.createUser(username.trim());
      setUser(newUser);
      onSuccess?.(newUser);
      handleClose();
    } finally {
      setUser({ username, id: 1 });
      setIsLoading(false);
      handleClose();
    }
  };

  const handleClose = () => {
    setUsername("");
    setError("");
    setIsLoading(false);
    onClose();
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !isLoading) {
      handleSave();
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      dir={direction}
    >
      <StyledDialogTitle
        severityColor="primary.main"
        borderColor="primary.light"
      >
        {t("UsernameDialog.title")}
      </StyledDialogTitle>

      <StyledDialogContent>
        <GeneralTypography
          variant="body1"
          value={t("UsernameDialog.message")}
          styleProps={{
            color: "var(--mui-palette-text-primary)",
            marginBottom: "16px",
          }}
        />

        <TextField
          fullWidth
          name="username"
          placeholder={t("UsernameDialog.placeholder")}
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          autoFocus
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderColor: "rgba(255, 255, 255, 0.3)",
              },
              "&.Mui-focused": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
            },
            "& .MuiOutlinedInput-input": {
              color: "white",
              padding: "16px 20px",
              "&::placeholder": {
                color: "rgba(255, 255, 255, 0.6)",
                opacity: 1,
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        />

        {error && (
          <GeneralTypography
            variant="body2"
            value={error}
            styleProps={{
              color: "var(--mui-palette-error-main)",
              marginTop: "8px",
            }}
          />
        )}
      </StyledDialogContent>

      <StyledDialogActions>
        <GeneralButton
          variantType="cancel"
          text={t("Common.cancel")}
          onClick={handleClose}
          disabled={isLoading}
        />
        <GeneralButton
          variantType="confirm"
          text={isLoading ? t("UsernameDialog.saving") : t("Common.save")}
          onClick={handleSave}
          disabled={isLoading || !username.trim()}
        />
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default UsernameDialog;
