import { Movie } from "@prisma/client";
import prisma from "../db/prisma";
import omdbService from "./omdb.service";
import { movieRepository } from "../repositories/movie.repository";
import { filterMoviesByQuery, sortMoviesByRelevance } from "../utils/movieUtils";

// Utility function to generate unique 10-digit random IDs for OMDb movies
const generateOMDbId = (): number => {
  // Generate a random 10-digit number (1000000000 to 9999999999)
  return Math.floor(Math.random() * 9000000000) + 1000000000;
};

export const MoviesService = {
  getAll: async (page: number = 1): Promise<Movie[]> => {
    const pageSize = 12;
    const skip = (page - 1) * pageSize;

    const dbMovies = await movieRepository.findAll(skip, pageSize);
    const totalMovies = await movieRepository.countAll();

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

      // Get movies from DB
      const dbMovies = await movieRepository.findManyBySearchQuery(query);

      // Get external OMDb movies
      const omdbMovies = await omdbService.searchMoviesWithDetails(query, 10);
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

      // Filter out external movies that already exist in the DB by title
      const uniqueExternalMovies: Movie[] = [];
      for (const movie of externalMovies) {
        const exists = await prisma.movie.findFirst({
          where: { title: movie.title },
        });
        if (!exists) {
          uniqueExternalMovies.push(movie);
        }
      }

      // Combine dbMovies + uniqueExternalMovies
      const combinedMovies = [...dbMovies, ...uniqueExternalMovies];

      // Filter movies by query
      const filteredMovies = filterMoviesByQuery(combinedMovies, cleanQuery);

      // Sort movies by relevance
      const sortedMovies = sortMoviesByRelevance(filteredMovies, cleanQuery);

      return sortedMovies;
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

  update: async (id: number, movieData: Partial<Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Movie | null> => {
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