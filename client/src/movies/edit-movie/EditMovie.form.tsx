import React, { useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import EditMovie from "./EditMovie";
import {
  getEditMovieSchema,
  type EditMovieInput,
} from "../../validation/movieScheme";
import type { Movie } from "../../interfaces";

interface EditMovieFormProps {
  movie: Movie;
  onSuccess?: () => void;
}

const EditMovieForm: React.FC<EditMovieFormProps> = ({ movie, onSuccess }) => {
  const { i18n } = useTranslation();

  const schema = useMemo(() => getEditMovieSchema(), [i18n.language]);

  const methods = useForm<EditMovieInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: movie.title,
      year: movie.year.toString(),
      runtime: movie.runtime,
      genre: movie.genre.split(", ").filter(Boolean),
      director: movie.director,
    },
  });

  return (
    <FormProvider {...methods}>
      <EditMovie movie={movie} onSuccess={onSuccess} />
    </FormProvider>
  );
};

export default EditMovieForm;
