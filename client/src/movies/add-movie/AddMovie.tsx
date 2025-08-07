import React from "react";
import { useFormContext } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import type { AddMovieInput } from "./interface";
import { useAddMovie } from "../../hooks/UseAddMovie";

const AddMovie: React.FC = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useFormContext<AddMovieInput>();
  const addMovieMutation = useAddMovie();

  const onSubmit = (data: AddMovieInput) => {
    addMovieMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["movies"] });
        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} placeholder="Title" required />
      <input type="number" {...register("year")} placeholder="Year" required />
      <input
        type="number"
        {...register("runtime")}
        placeholder="Runtime"
        required
      />
      <input {...register("genre")} placeholder="Genre" required />
      <input {...register("director")} placeholder="Director" required />

      <button type="submit" disabled={addMovieMutation.isPending}>
        {addMovieMutation.isPending ? "Adding..." : "Add Movie"}
      </button>
    </form>
  );
};

export default AddMovie;
