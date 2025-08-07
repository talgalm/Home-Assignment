import { Movie } from "../models/Movie.interface";
import prisma from "../db/prisma";

export const MoviesService = {
  getAll: async (): Promise<Movie[]> => {
    try {
      const movies = await prisma.movie.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return movies;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw new Error('Failed to fetch movies');
    }
  },

  getById: async (id: number): Promise<Movie | null> => {
    try {
      const movie = await prisma.movie.findUnique({
        where: { id }
      });
      return movie;
    } catch (error) {
      console.error('Error fetching movie:', error);
      throw new Error('Failed to fetch movie');
    }
  },

  add: async (movieData: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>): Promise<Movie> => {
    try {
      const newMovie = await prisma.movie.create({
        data: {
          title: movieData.title,
          director: movieData.director,
          year: movieData.year
        }
      });
      return newMovie;
    } catch (error) {
      console.error('Error creating movie:', error);
      throw new Error('Failed to create movie');
    }
  },

  update: async (id: number, movieData: Partial<Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Movie | null> => {
    try {
      const updatedMovie = await prisma.movie.update({
        where: { id },
        data: movieData
      });
      return updatedMovie;
    } catch (error) {
      console.error('Error updating movie:', error);
      throw new Error('Failed to update movie');
    }
  },

  delete: async (id: number): Promise<boolean> => {
    try {
      await prisma.movie.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      console.error('Error deleting movie:', error);
      throw new Error('Failed to delete movie');
    }
  },
};