import React from "react";
import { useFormContext } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import type { AddMovieInput } from "../../validation/movieScheme";
import { useAddMovie } from "../../hooks/useAddMovie";
import {
  StyledForm,
  StyledSubmitButton,
  FormTitle,
  FormContainer,
} from "./AddMovie.styles";
import { GENRES } from "./consts";
import GeneralInput from "../../components/input/Input";
import Autocomplete from "../../components/autocomplete";
type AddMovieProps = {
  onClose?: () => void;
};

const AddMovie: React.FC<AddMovieProps> = ({ onClose }) => {
  const queryClient = useQueryClient();
  const { handleSubmit, reset } = useFormContext<AddMovieInput>();
  const addMovieMutation = useAddMovie();

  const onSubmit = (data: AddMovieInput) => {
    const formattedData = {
      ...data,
      genre: data.genre.join(", "),
    };

    addMovieMutation.mutate(formattedData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["movies"] });
        reset();
        onClose?.();
      },
    });
  };

  return (
    <FormContainer>
      <FormTitle>Add New Movie</FormTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <GeneralInput name="title" placeholder="Movie Title" />
        <GeneralInput
          name="year"
          type="number"
          placeholder="Release Year"
          defaultValue="2000"
        />
        <GeneralInput
          name="runtime"
          type="number"
          placeholder="Runtime (minutes)"
          defaultValue={90}
        />

        <Autocomplete
          name="genre"
          options={GENRES}
          label="Genres"
          placeholder="Add genres (e.g., Action, Drama)"
          multiple={true}
          freeSolo={true}
          defaultValue={[]}
        />

        <GeneralInput name="director" placeholder="Director" />

        <StyledSubmitButton
          type="submit"
          disabled={addMovieMutation.isPending}
          fullWidth
          variant="outlined"
        >
          {addMovieMutation.isPending ? "Adding Movie..." : "Add Movie"}
        </StyledSubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default AddMovie;
