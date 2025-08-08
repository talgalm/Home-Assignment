import React from "react";
import { useTranslation } from "react-i18next";
import { Language as LanguageIcon } from "@mui/icons-material";
import {
  StyledLanguageSwitcher,
  StyledIconButton,
  StyledMenu,
  StyledMenuItem,
  StyledTypography,
} from "./LanguageSwitcher.styles";

const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();
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
      <StyledIconButton
        onClick={handleClick}
        color="inherit"
        aria-label={t("Header.language")}
      >
        <LanguageIcon />
      </StyledIconButton>

      <StyledMenu
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
      >
        <StyledMenuItem
          onClick={() => handleLanguageChange("he")}
          selected={currentLanguage === "he"}
        >
          <StyledTypography variant="body2">
            {t("Languages.he")}
          </StyledTypography>
        </StyledMenuItem>

        <StyledMenuItem
          onClick={() => handleLanguageChange("en")}
          selected={currentLanguage === "en"}
        >
          <StyledTypography variant="body2">
            {t("Languages.en")}
          </StyledTypography>
        </StyledMenuItem>
      </StyledMenu>
    </StyledLanguageSwitcher>
  );
};

export default LanguageSwitcher;
