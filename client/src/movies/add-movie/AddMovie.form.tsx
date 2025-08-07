import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddMovie from "./AddMovie";
import {
  addMovieSchema,
  type AddMovieInput,
} from "../../validation/movieScheme";

type AddMovieFormProps = {
  onClose?: () => void;
};

const AddMovieForm: React.FC<AddMovieFormProps> = ({ onClose }) => {
  const methods = useForm<AddMovieInput>({
    resolver: zodResolver(addMovieSchema),
    defaultValues: {
      title: "",
      year: "2000",
      runtime: "90",
      genre: [],
      director: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <AddMovie onClose={onClose} />
    </FormProvider>
  );
};

export default AddMovieForm;
