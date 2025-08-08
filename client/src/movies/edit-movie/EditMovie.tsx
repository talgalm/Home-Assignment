import React from "react";
import { useFormContext } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import type { EditMovieInput } from "../../validation/movieScheme";
import { useEditMovie } from "../../hooks/useEditMovie";
import {
  StyledForm,
  StyledSubmitButton,
  FormTitle,
  FormContainer,
} from "../add-movie/AddMovie.styles";
import { GENRES } from "../add-movie/consts";
import GeneralInput from "../../components/input/Input";
import Autocomplete from "../../components/autocomplete";
import type { Movie } from "../../interfaces";

interface EditMovieProps {
  movie: Movie;
  onSuccess?: () => void;
}

const EditMovie: React.FC<EditMovieProps> = ({ movie, onSuccess }) => {
  const queryClient = useQueryClient();
  const { handleSubmit } = useFormContext<EditMovieInput>();
  const editMovieMutation = useEditMovie();

  const onSubmit = (data: EditMovieInput) => {
    const currentGenres = data.genre.join(", ").trim();

    editMovieMutation.mutate(
      { id: Number(movie.id), ...data, genre: currentGenres },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      }
    );
  };

  return (
    <FormContainer>
      <FormTitle>Edit Movie</FormTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <GeneralInput
          name="title"
          placeholder="Movie Title"
          defaultValue={movie.title}
        />
        <GeneralInput
          name="year"
          type="number"
          placeholder="Release Year"
          defaultValue={movie.year.toString()}
        />
        <GeneralInput
          name="runtime"
          placeholder="Runtime (minutes)"
          defaultValue={movie.runtime}
        />

        <Autocomplete
          name="genre"
          options={GENRES}
          label="Genres"
          placeholder="Add genres (e.g., Action, Drama)"
          multiple={true}
          freeSolo={true}
          defaultValue={movie.genre.split(", ").filter(Boolean)}
        />

        <GeneralInput
          name="director"
          placeholder="Director"
          defaultValue={movie.director}
        />

        <StyledSubmitButton
          type="submit"
          disabled={editMovieMutation.isPending}
          fullWidth
          variant="outlined"
        >
          {editMovieMutation.isPending ? "Updating..." : "Update Movie"}
        </StyledSubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default EditMovie;
