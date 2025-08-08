import React from "react";
import { useTranslation } from "react-i18next";
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
import { useLanguageDirection } from "../../hooks/useLanguageDirection";
import type { Movie } from "../../interfaces";

interface EditMovieProps {
  movie: Movie;
  onSuccess?: () => void;
}

const EditMovie: React.FC<EditMovieProps> = ({ movie, onSuccess }) => {
  const { t } = useTranslation();
  const direction = useLanguageDirection();
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
    <FormContainer $direction={direction}>
      <FormTitle>{t("EditMovie.title")}</FormTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <GeneralInput
          name="title"
          placeholder={t("EditMovie.form.titlePlaceholder")}
          defaultValue={movie.title}
        />
        <GeneralInput
          name="year"
          type="number"
          placeholder={t("EditMovie.form.yearPlaceholder")}
          defaultValue={movie.year.toString()}
        />
        <GeneralInput
          name="runtime"
          placeholder={t("EditMovie.form.runtimePlaceholder")}
          defaultValue={movie.runtime}
        />

        <Autocomplete
          name="genre"
          options={GENRES}
          label={t("EditMovie.form.genre")}
          placeholder={t("EditMovie.form.genrePlaceholder")}
          multiple={true}
          freeSolo={true}
          defaultValue={movie.genre.split(", ").filter(Boolean)}
        />

        <GeneralInput
          name="director"
          placeholder={t("EditMovie.form.directorPlaceholder")}
          defaultValue={movie.director}
        />

        <StyledSubmitButton
          type="submit"
          disabled={editMovieMutation.isPending}
          fullWidth
          variant="outlined"
        >
          {editMovieMutation.isPending
            ? t("EditMovie.submitting")
            : t("EditMovie.submit")}
        </StyledSubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default EditMovie;
