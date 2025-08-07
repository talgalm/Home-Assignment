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
import { useSearch } from "../../context/SearchContext";

import logo from "../../assets/logo.svg";
import Popup from "../popup/Popup";

const Header: React.FC = () => {
  const { searchValue, setSearchValue } = useSearch();
  const [modal, setModal] = useState(false);

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
      </SearchContainer>
      <Popup isOpen={modal} onClose={() => setModal(false)} />
    </HeaderContainer>
  );
};

export default Header;
