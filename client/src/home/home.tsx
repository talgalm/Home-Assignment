import React, { useState } from "react";
import GeneralLoader from "../components/loader/loader";
import GeneralSearch from "../components/search/Search";
import { useMovies } from "../hooks/useMovies";
import Popup from "../components/popup/Popup";
import { AddIcon, HomeContainer, SeacrhIcon } from "./Home.styles";

const Home: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data: movies, isLoading, error } = useMovies();
  const [modal, setModal] = useState(false);

  if (isLoading)
    return <GeneralLoader loading={true} text="Searching IMDb..." />;

  if (error) return <div>Error loading movies: {error.message}</div>;

  return (
    <HomeContainer>
      <GeneralSearch
        icon={<SeacrhIcon />}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search something..."
      />
      <ul>
        {movies?.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
      <AddIcon onClick={() => setModal(true)} />
      <Popup isOpen={modal} onClose={() => setModal(false)}/>
    </HomeContainer>
  );
};

export default Home;
