import React from "react";
import { useTranslation } from "react-i18next";
import { Language as LanguageIcon } from "@mui/icons-material";
import {
  StyledLanguageSwitcher,
  StyledIconButton,
  StyledMenu,
  StyledMenuItem,
} from "./LanguageSwitcher.styles";
import GeneralTypography from "../typography/Typography";

const flags = {
  he: "🇮🇱",
  en: "🇺🇸",
};

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
        <LanguageIcon color="primary" />
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
          <span style={{ marginRight: 8 }}>{flags["he"]}</span>
          <GeneralTypography
            variant="body2"
            value={t("Languages.he")}
            styleProps={{ fontFamily: "inherit", display: "inline-block" }}
          />
        </StyledMenuItem>

        <StyledMenuItem
          onClick={() => handleLanguageChange("en")}
          selected={currentLanguage === "en"}
        >
          <span style={{ marginRight: 8 }}>{flags["en"]}</span>
          <GeneralTypography
            variant="body2"
            value={t("Languages.en")}
            styleProps={{ fontFamily: "inherit", display: "inline-block" }}
          />
        </StyledMenuItem>
      </StyledMenu>
    </StyledLanguageSwitcher>
  );
};

export default LanguageSwitcher;
