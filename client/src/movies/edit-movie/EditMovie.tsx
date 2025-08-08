import React from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import type { EditMovieInput } from "../../validation/movieScheme";
import { useEditMovie } from "../../hooks/useEditMovie";
import {
  StyledForm,
  StyledSubmitButton,
  FormContainer,
  StyledGeneralTypography,
} from "../add-movie/AddMovie.styles";
import { GENRES } from "../add-movie/consts";
import GeneralInput from "../../components/input/Input";
import { useLanguageDirection } from "../../hooks/useLanguageDirection";
import type { Movie } from "../../interfaces";
import Autocomplete from "../../components/autocomplete/Autocomplete";

interface EditMovieProps {
  movie: Movie;
  onSuccess?: () => void;
}

const EditMovie: React.FC<EditMovieProps> = ({ movie, onSuccess }) => {
  const { t } = useTranslation();
  const direction = useLanguageDirection();
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
      <StyledGeneralTypography variant="h2" value={t("EditMovie.title")} />
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
