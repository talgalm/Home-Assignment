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
  movie: Movie
  onSuccess?: () => void;
}

const EditMovie: React.FC<EditMovieProps> = ({ movie, onSuccess }) => {
  const queryClient = useQueryClient();
  const { handleSubmit, reset, watch } = useFormContext<EditMovieInput>();
  const editMovieMutation = useEditMovie();

  // Watch all form values to detect changes
  const watchedValues = watch();

  const onSubmit = (data: EditMovieInput) => {
    // Only include fields that have changed
    const changes: Partial<EditMovieInput> = {};

    if (data.title !== movie.title) changes.title = data.title;
    if (data.year !== movie.year) changes.year = data.year;
    if (data.runtime !== movie.runtime) changes.runtime = data.runtime;
    if (data.genre.join(", ") !== movie.genre)
      changes.genre = data.genre.join(", ");
    if (data.director !== movie.director) changes.director = data.director;

    // Only submit if there are changes
    if (Object.keys(changes).length > 0) {
      editMovieMutation.mutate(
        { id: Number(movie.id), ...changes },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["movies"] });
            onSuccess?.();
          },
        }
      );
    } else {
      // No changes, just close the popup
      onSuccess?.();
    }
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
