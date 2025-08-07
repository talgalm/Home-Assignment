import React, { useState } from "react";
import { HomeContainer, SeacrhIcon } from "./home.styles";
import GeneralLoader from "../components/loader/loader";
import GeneralSearch from "../components/search/Search";
import { useMovies } from "../hooks/UseMovies";

const Home: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data: movies, isLoading, error } = useMovies();

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
    </HomeContainer>
  );
};

export default Home;
