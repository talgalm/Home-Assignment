import React from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import type { AddMovieInput } from "../../validation/movieScheme";
import { useAddMovie } from "../../hooks/useAddMovie";
import {
  StyledForm,
  StyledSubmitButton,
  FormContainer,
  StyledGeneralTypography,
} from "./AddMovie.styles";
import { GENRES } from "./consts";
import GeneralInput from "../../components/input/Input";
import TitleInput from "../../components/input/TitleInput";
import { useLanguageDirection } from "../../hooks/useLanguageDirection";
import Autocomplete from "../../components/autocomplete/Autocomplete";

type AddMovieProps = {
  onClose?: () => void;
};

const AddMovie: React.FC<AddMovieProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const direction = useLanguageDirection();
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormContext<AddMovieInput>();
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
    <FormContainer $direction={direction}>
      <StyledGeneralTypography
        variant="h2"
        value={t("AddMovie.title")}
      />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <TitleInput
          name="title"
          placeholder={t("AddMovie.form.titlePlaceholder")}
        />
        <GeneralInput
          name="year"
          type="number"
          placeholder={t("AddMovie.form.yearPlaceholder")}
          defaultValue="2000"
        />
        <GeneralInput
          name="runtime"
          type="number"
          placeholder={t("AddMovie.form.runtimePlaceholder")}
          defaultValue={90}
        />

        <Autocomplete
          name="genre"
          options={GENRES}
          placeholder={t("AddMovie.form.genrePlaceholder")}
          multiple={true}
          freeSolo={true}
          defaultValue={[]}
        />

        <GeneralInput
          name="director"
          placeholder={t("AddMovie.form.directorPlaceholder")}
        />

        <StyledSubmitButton
          type="submit"
          disabled={addMovieMutation.isPending || !!errors.title}
          fullWidth
          variant="outlined"
        >
          {addMovieMutation.isPending
            ? t("AddMovie.submitting")
            : t("AddMovie.submit")}
        </StyledSubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default AddMovie;
