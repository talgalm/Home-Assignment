import { z } from "zod";

export const addMovieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  year: z
    .string()
    .regex(/^\d{4}$/, "Year must be a 4-digit number")
    .refine((val) => {
      const num = Number(val);
      return num >= 1900 && num <= new Date().getFullYear();
    }, "Year must be between 1900 and current year"),
  runtime: z.string().min(1, "Runtime is required"),
  genre: z.array(z.string().min(1, "Genre cannot be empty")).min(1, "At least one genre is required"),
  director: z.string().min(1, "Director is required"),
}).refine((data) => {
  // This will be handled by the TitleInput component
  return true;
}, {
  message: "A movie with this title already exists",
  path: ["title"],
});

export const editMovieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  year: z
    .string()
    .regex(/^\d{4}$/, "Year must be a 4-digit number")
    .refine((val) => {
      const num = Number(val);
      return num >= 1900 && num <= new Date().getFullYear();
    }, "Year must be between 1900 and current year"),
  runtime: z.string().min(1, "Runtime is required"),
  genre: z.array(z.string().min(1, "Genre cannot be empty")).min(1, "At least one genre is required"),
  director: z.string().min(1, "Director is required"),
});

export type AddMovieInput = z.infer<typeof addMovieSchema>;
export type EditMovieInput = z.infer<typeof editMovieSchema>;