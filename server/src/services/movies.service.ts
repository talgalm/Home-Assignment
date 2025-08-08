import { Movie } from "@prisma/client";
import prisma from "../db/prisma";
import omdbService from "./omdb.service";
import { movieRepository } from "../repositories/movie.repository";
import { filterMoviesByQuery, generateOMDbId } from "../utils/movieUtils";

const pageSize = 12;

export const MoviesService = {
  getAll: async (page: number = 1): Promise<Movie[]> => {
    const skip = (page - 1) * pageSize;

    const dbMovies = await movieRepository.findAll(skip, pageSize);

    if (dbMovies.length < pageSize) {
      const additionalCount = pageSize - dbMovies.length;
      const additionalMovies = await MoviesService.fetchAdditionalMovies(additionalCount);
      return [...dbMovies, ...additionalMovies];
    }

    return dbMovies;
  },

  search: async (query: string): Promise<Movie[]> => {
    try {
      const cleanQuery = query.trim().toLowerCase();
      const queryWords = cleanQuery.split(/\s+/).filter(word => word.length > 0);

      if (queryWords.length === 0) {
        return [];
      }

      const dbMovies = await movieRepository.findManyBySearchQuery(query);

      const omdbMovies = await omdbService.searchMoviesWithDetails(query, 12);
      const externalMovies: Movie[] = omdbMovies.map(omdbMovie => ({
        id: generateOMDbId(),
        title: omdbMovie.Title,
        director: omdbMovie.Director || 'Unknown',
        year: omdbMovie.Year,
        genre: omdbMovie.Genre || 'Unknown',
        runtime: omdbMovie.Runtime || 'Unknown',
        img: omdbMovie.Poster || null,
        action: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      const uniqueExternalMovies: Movie[] = [];
      for (const movie of externalMovies) {
        const exists = await prisma.movie.findFirst({
          where: { title: movie.title },
        });
        if (!exists) {
          uniqueExternalMovies.push(movie);
        }
      }

      const combinedMovies = [...dbMovies, ...uniqueExternalMovies];

      const filteredMovies = filterMoviesByQuery(combinedMovies, cleanQuery);

      return filteredMovies;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw new Error('Failed to search movies');
    }
  },

  fetchAdditionalMovies: async (count: number): Promise<Movie[]> => {
    try {
      const omdbMovies = await omdbService.getRandomMovies(count);
      return omdbMovies.map(omdbMovie => ({
        id: generateOMDbId(),
        title: omdbMovie.Title,
        director: omdbMovie.Director || 'Unknown',
        year: omdbMovie.Year,
        genre: omdbMovie.Genre || 'Unknown',
        runtime: omdbMovie.Runtime || 'Unknown',
        img: omdbMovie.Poster || null,
        action: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
    } catch (error) {
      console.error('Error fetching additional movies:', error);
      return [];
    }
  },

  getById: async (id: number): Promise<Movie | null> => {
    return movieRepository.findById(id);
  },

  getByTitle: async (title: string): Promise<Movie | null> => {
    const cleanTitle = title.trim().toLowerCase();
    return movieRepository.findFirstByTitle(cleanTitle);
  },

  add: async (movieData: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>): Promise<Movie> => {
    return movieRepository.create(movieData);
  },

  update: async (
    id: number,
    movieData: Partial<Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Movie | null> => {
    console.log(id)
    const movie = await movieRepository.findById(id);
    console.log("!!2")
    console.log(movie)
    if (!movie) {
      const newMovieData: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'> = {
        title: movieData.title ?? "Unknown Title",
        director: movieData.director ?? "Unknown Director",
        year: movieData.year ?? new Date().getFullYear().toString(),
        genre: movieData.genre ?? '',
        runtime: movieData.runtime ?? "Unknown",
        img: movieData.img ?? "",
        action: "updated",
      };
      return movieRepository.create(newMovieData);
    }
    return movieRepository.update(id, movieData);
  },

  checkTitleExists: async (title: string): Promise<boolean> => {
    const cleanTitle = title.trim().toLowerCase();
    const dbMovie = await movieRepository.findFirstByTitle(cleanTitle);
    if (dbMovie) return true;

    try {
      const omdbMovies = await omdbService.searchMoviesWithDetails(title, 5);
      return omdbMovies.some(movie =>
        movie.Title.toLowerCase() === cleanTitle ||
        movie.Title.toLowerCase().includes(cleanTitle) ||
        cleanTitle.includes(movie.Title.toLowerCase())
      );
    } catch (error) {
      console.error('Error checking OMDb API:', error);
      return false;
    }
  },

  delete: async (id: number): Promise<boolean> => {
    if (id > 0) {
      return movieRepository.softDelete(id);
    }
    return false;
  }
};