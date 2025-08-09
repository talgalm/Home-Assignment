import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AddIcon,
  ButtonsContainer,
  DisplayConteinr,
  HeaderContainer,
  HeaderTitle,
  LogoImage,
  SearchContainer,
} from "./Header.styles";
import GeneralSearch from "../search/Search";
import { Search as SearchIcon } from "@mui/icons-material";
import { useSearch } from "../../context/SearchContext";
import { IconButton, Badge } from "@mui/material";
import { useAtom } from "jotai";
import {
  showFavoritesOnlyAtom,
  toggleFavoritesViewAtom,
} from "../../store/favoritesViewAtom";
import logo from "../../assets/logo.svg";
import Popup from "../popup/Popup";
import { useFavorites } from "../../hooks/useFavorites";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import LanguageSwitcher from "../language-switcher/LanguageSwitcher";
import { userAtom } from "../../store/userAtom";
import UsernameDialog from "../username-dialog/UsernameDialog";
import { useUsernameDialog } from "../../hooks/useUsernameDialog";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { searchValue, setSearchValue } = useSearch();
  const [modal, setModal] = useState(false);
  const { favorites } = useFavorites();
  const [user] = useAtom(userAtom);
  const { isOpen, openDialog, closeDialog, handleSuccess } =
    useUsernameDialog();

  const handleAdd = () => {
    if (user) {
      setModal(true);
    } else {
      openDialog(() => setModal(true));
    }
  };

  const [showFavoritesOnly] = useAtom(showFavoritesOnlyAtom);
  const [, toggleFavoritesView] = useAtom(toggleFavoritesViewAtom);

  return (
    <HeaderContainer>
      <DisplayConteinr>
        <HeaderTitle>
          <LogoImage src={logo} alt="Logo" />
        </HeaderTitle>
        <SearchContainer>
          <GeneralSearch
            icon={<SearchIcon />}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t("Header.search")}
          />
        </SearchContainer>
      </DisplayConteinr>
      <ButtonsContainer>
        <IconButton sx={{ ml: 1 }} onClick={toggleFavoritesView}>
          <Badge badgeContent={favorites.length}>
            {!showFavoritesOnly ? (
              <StarIcon color="primary" />
            ) : (
              <StarOutlineIcon color="primary" />
            )}
          </Badge>
        </IconButton>
        <AddIcon onClick={handleAdd} />
        <LanguageSwitcher />
      </ButtonsContainer>
      <Popup isOpen={modal} onClose={() => setModal(false)} />
      <UsernameDialog
        open={isOpen}
        onClose={closeDialog}
        onSuccess={handleSuccess}
      />
    </HeaderContainer>
  );
};

export default Header;
