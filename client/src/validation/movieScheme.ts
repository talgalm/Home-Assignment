import { z } from "zod";

const minStr = (field: string) => z.string().min(3, `${field} must be at least 3 characters`);

export const addMovieSchema = z.object({
  title: minStr("Title"),
  year: z
    .string()
    .regex(/^\d{4}$/, "Year must be a 4-digit number")
    .refine((val) => {
      const num = Number(val);
      return num >= 1900 && num <= new Date().getFullYear();
    }, "Year must be between 1900 and current year"),
  runtime: minStr("Runtime"),
  genre: z
    .array(minStr("Genre"))
    .min(1, "At least one genre is required"),
  director: minStr("Director"),
}).refine(
  () => true,
  {
    message: "A movie with this title already exists",
    path: ["title"],
  }
);

export const editMovieSchema = z.object({
  title: minStr("Title"),
  year: z
    .string()
    .regex(/^\d{4}$/, "Year must be a 4-digit number")
    .refine((val) => {
      const num = Number(val);
      return num >= 1900 && num <= new Date().getFullYear();
    }, "Year must be between 1900 and current year"),
  runtime: minStr("Runtime"),
  genre: z
    .array(minStr("Genre"))
    .min(1, "At least one genre is required"),
  director: minStr("Director"),
});

export type AddMovieInput = z.infer<typeof addMovieSchema>;
export type EditMovieInput = z.infer<typeof editMovieSchema>;