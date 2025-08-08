import { z } from "zod";
import i18n from "../i18n";

// Helper function to get translated validation message
const t = (key: string, options?: Record<string, string | number>) => {
  return i18n.t(`Validation.${key}`, options);
};

// Helper function to create minimum string validation with translation
const minStr = (field: string, min: number = 3) => 
  z.string().min(min, t("minLength", { min, field }));

// Helper function to create localized schemas
const createMovieSchema = () => {
  const currentYear = new Date().getFullYear();
  
  return z.object({
    title: minStr("Title"),
    year: z
      .string()
      .regex(/^\d{4}$/, t("yearFormat"))
      .refine((val) => {
        const num = Number(val);
        return num >= 1900 && num <= currentYear;
      }, t("yearRange", { currentYear })),
    runtime: minStr("Runtime"),
    genre: z
      .array(minStr("Genre"))
      .min(1, t("atLeastOneGenre")),
    director: minStr("Director"),
  });
};

// Function to get localized add movie schema
export const getAddMovieSchema = () => {
  return createMovieSchema().refine(
    () => true,
    {
      message: t("titleExists"),
      path: ["title"],
    }
  );
};

// Function to get localized edit movie schema
export const getEditMovieSchema = () => {
  return createMovieSchema();
};

// Static schemas for backward compatibility (using current language)
export const addMovieSchema = getAddMovieSchema();
export const editMovieSchema = getEditMovieSchema();

export type AddMovieInput = z.infer<typeof addMovieSchema>;
export type EditMovieInput = z.infer<typeof editMovieSchema>;