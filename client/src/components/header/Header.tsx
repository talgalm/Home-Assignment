import React, { useState } from "react";
import {
  AddIcon,
  HeaderContainer,
  HeaderTitle,
  LogoImage,
  SearchContainer,
} from "./Header.styles";
import GeneralSearch from "../search/Search";
import { Search as SearchIcon } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
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

const Header: React.FC = () => {
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
        <AddIcon onClick={() => setModal(true)} />
        <GeneralSearch
          icon={<SearchIcon />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search movies..."
        />
        <IconButton sx={{ ml: 1 }} onClick={toggleFavoritesView}>
          <Badge badgeContent={favorites.length}>
            {!showFavoritesOnly ? (
              <FavoriteIcon color="primary" />
            ) : (
              <FavoriteBorderIcon color="primary" />
            )}
          </Badge>
        </IconButton>
      </SearchContainer>
      <Popup isOpen={modal} onClose={() => setModal(false)} />
    </HeaderContainer>
  );
};

export default Header;
