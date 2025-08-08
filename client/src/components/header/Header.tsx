import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AddIcon,
  HeaderContainer,
  HeaderTitle,
  LogoImage,
  SearchContainer,
} from "./Header.styles";
import GeneralSearch from "../search/Search";
import { Search as SearchIcon } from "@mui/icons-material";
import { useSearch } from "../../context/SearchContext";
import { useAppSelector } from "../../store/hooks";
import { IconButton, Badge } from "@mui/material";
import { useAtom } from "jotai";
import {
  showFavoritesOnlyAtom,
  toggleFavoritesViewAtom,
} from "../../store/favoritesViewAtom";
import logo from "../../assets/logo.svg";
import Popup from "../popup/Popup";
import type { RootState } from "../../store";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import LanguageSwitcher from "../language-switcher/LanguageSwitcher";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { searchValue, setSearchValue } = useSearch();
  const [modal, setModal] = useState(false);
  const favorites = useAppSelector(
    (state: RootState) => state.favorites.movies
  );
  const [showFavoritesOnly] = useAtom(showFavoritesOnlyAtom);
  const [, toggleFavoritesView] = useAtom(toggleFavoritesViewAtom);

  return (
    <HeaderContainer>
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
        <IconButton sx={{ ml: 1 }} onClick={toggleFavoritesView}>
          <Badge badgeContent={favorites.length}>
            {!showFavoritesOnly ? (
              <StarIcon color="primary" />
            ) : (
              <StarOutlineIcon color="primary" />
            )}
          </Badge>
        </IconButton>
        <AddIcon onClick={() => setModal(true)} />
        <LanguageSwitcher />
      </SearchContainer>
      <Popup isOpen={modal} onClose={() => setModal(false)} />
    </HeaderContainer>
  );
};

export default Header;
