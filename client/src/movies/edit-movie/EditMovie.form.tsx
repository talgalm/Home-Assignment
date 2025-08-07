import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EditMovie from "./EditMovie";
import {
  editMovieSchema,
  type EditMovieInput,
} from "../../validation/movieScheme";
import type { Movie } from "../../interfaces";

interface EditMovieFormProps {
  movie: Movie;
  onSuccess?: () => void;
}

const EditMovieForm: React.FC<EditMovieFormProps> = ({ movie, onSuccess }) => {
  const methods = useForm<EditMovieInput>({
    resolver: zodResolver(editMovieSchema),
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
