import React, { useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import AddMovie from "./AddMovie";
import {
  getAddMovieSchema,
  type AddMovieInput,
} from "../../validation/movieScheme";

type AddMovieFormProps = {
  onClose?: () => void;
};

const AddMovieForm: React.FC<AddMovieFormProps> = ({ onClose }) => {
  const { i18n } = useTranslation();

  const schema = useMemo(() => getAddMovieSchema(), [i18n.language]);

  const methods = useForm<AddMovieInput>({
    resolver: zodResolver(schema),
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
