import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import type { AddMovieInput } from "./interface";
import AddMovie from "./Addmovie";

const AddMovieForm: React.FC = () => {
  const methods = useForm<AddMovieInput>({
    defaultValues: {},
  });

  return (
    <FormProvider {...methods}>
      <AddMovie />
    </FormProvider>
  );
};

export default AddMovieForm;