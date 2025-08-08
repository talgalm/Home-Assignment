import React from "react";
import { useTranslation } from "react-i18next";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Language as LanguageIcon } from "@mui/icons-material";
import { StyledLanguageSwitcher } from "./LanguageSwitcher.styles";
import { useLanguageDirection } from "../../hooks/useLanguageDirection";

const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();
  const direction = useLanguageDirection();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    handleClose();
  };

  const currentLanguage = i18n.language;

  return (
    <StyledLanguageSwitcher>
      <IconButton
        onClick={handleClick}
        color="inherit"
        aria-label={t("Header.language")}
        sx={{
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(26, 26, 26, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            minWidth: 120,
          },
        }}
      >
        <MenuItem
          onClick={() => handleLanguageChange("he")}
          selected={currentLanguage === "he"}
          sx={{
            color: currentLanguage === "he" ? "#f5c518" : "white",
            "&:hover": {
              backgroundColor: "rgba(245, 197, 24, 0.1)",
            },
            "&.Mui-selected": {
              backgroundColor: "rgba(245, 197, 24, 0.2)",
              "&:hover": {
                backgroundColor: "rgba(245, 197, 24, 0.3)",
              },
            },
          }}
        >
          <Typography variant="body2" sx={{ fontFamily: "inherit" }}>
            {t("Languages.he")}
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => handleLanguageChange("en")}
          selected={currentLanguage === "en"}
          sx={{
            color: currentLanguage === "en" ? "#f5c518" : "white",
            "&:hover": {
              backgroundColor: "rgba(245, 197, 24, 0.1)",
            },
            "&.Mui-selected": {
              backgroundColor: "rgba(245, 197, 24, 0.2)",
              "&:hover": {
                backgroundColor: "rgba(245, 197, 24, 0.3)",
              },
            },
          }}
        >
          <Typography variant="body2" sx={{ fontFamily: "inherit" }}>
            {t("Languages.en")}
          </Typography>
        </MenuItem>
      </Menu>
    </StyledLanguageSwitcher>
  );
};

export default LanguageSwitcher;
