import React, { useState } from "react";
import GeneralLoader from "../components/loader/loader";
import GeneralSearch from "../components/search/Search";
import { useMovies } from "../hooks/useMovies";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { useDebounce } from "../hooks/useDebounce";
import Popup from "../components/popup/Popup";
import { AddIcon, HomeContainer, SeacrhIcon } from "./Home.styles";
import type { Movie } from "../interfaces";
import MovieGrid from "../components/movie-grid/MovieGrid";

const Home: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const { data: movies, isLoading, error } = useMovies();
  const { data: searchResults, isLoading: isSearching } =
    useSearchMovies(debouncedSearchValue);
  const [modal, setModal] = useState(false);
  const [editMovie, setEditMovie] = useState<Movie | undefined>(undefined);

  const displayMovies = debouncedSearchValue ? searchResults : movies;
  const isLoadingData = debouncedSearchValue ? isSearching : isLoading;

  if (isLoadingData)
    return (
      <GeneralLoader
        loading={true}
        text={debouncedSearchValue ? "Searching..." : "Loading movies..."}
      />
    );

  if (error) return <div>Error loading movies: {error.message}</div>;

  const handlEditMovie = (movie: Movie) => {
    setEditMovie(movie);
    setModal(true);
  };

  return (
    <HomeContainer>
      <GeneralSearch
        icon={<SeacrhIcon />}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search something..."
      />
      <MovieGrid movies={displayMovies || []} onMovieClick={handlEditMovie} />
      <AddIcon onClick={() => setModal(true)} />
      <Popup isOpen={modal} onClose={() => setModal(false)} movie={editMovie} />
    </HomeContainer>
  );
};

export default Home;
