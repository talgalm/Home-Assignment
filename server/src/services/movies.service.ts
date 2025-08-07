import { Movie } from "@prisma/client";
import prisma from "../db/prisma";
import omdbService from "./omdb.service";

// Utility function to generate unique 10-digit random IDs for OMDb movies
const generateOMDbId = (): number => {
  // Generate a random 10-digit number (1000000000 to 9999999999)
  return Math.floor(Math.random() * 9000000000) + 1000000000;
};

export const MoviesService = {
  getAll: async (): Promise<Movie[]> => {
    try {
      const dbMovies = await prisma.movie.findMany({
        where: {
          OR: [
            { action: null },
            { action: { not: 'deleted' } }
          ]
        },
        orderBy: { createdAt: 'desc' }
      });

      // If we have less than 10 movies, fetch additional ones from OMDb
      if (dbMovies.length < 10) {
        const additionalCount = 10 - dbMovies.length;
        const additionalMovies = await MoviesService.fetchAdditionalMovies(additionalCount);
        return [...dbMovies, ...additionalMovies];
      }

      return dbMovies;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw new Error('Failed to fetch movies');
    }
  },

  search: async (query: string): Promise<Movie[]> => {
    try {
      const cleanQuery = query.trim().toLowerCase();
      const queryWords = cleanQuery.split(/\s+/).filter(word => word.length > 0);

      if (queryWords.length === 0) {
        return [];
      }

      // Search in database for movies matching the query
      const dbMovies = await prisma.movie.findMany({
        where: {
          AND: [
            {
              OR: [
                {
                  title: {
                    equals: cleanQuery,
                    mode: 'insensitive'
                  }
                },
                {
                  title: {
                    startsWith: cleanQuery,
                    mode: 'insensitive'
                  }
                },
                {
                  title: {
                    contains: cleanQuery,
                    mode: 'insensitive'
                  }
                }
              ]
            },
            {
              OR: [
                { action: null },
                { action: { not: 'deleted' } }
              ]
            }
          ]
        },
        orderBy: { createdAt: 'desc' }
      });

      // Search in OMDb API
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
        updatedAt: new Date()
      }));

      // Combine and remove duplicates (prioritize database movies)
      const allMovies = [...dbMovies, ...externalMovies];
      const uniqueMovies = allMovies.filter((movie, index, self) => 
        index === self.findIndex(m => m.title.toLowerCase() === movie.title.toLowerCase())
      );

      // Check each uniqueMovies title individually and filter out those that exist in DB
      const uniqueMoviesFiltered = [];
      for (const movie of uniqueMovies) {
        const exists = await prisma.movie.findFirst({
          where: {
            title: movie.title,
          },
        });
      
        if (!exists) {
          uniqueMoviesFiltered.push(movie);
        }
      }

      // Filter results to only include movies that closely match the query
      const filteredMovies = uniqueMoviesFiltered.filter(movie => {
        const movieTitle = movie.title.toLowerCase();
        
        // Exact match - always include
        if (movieTitle === cleanQuery) return true;
        
        // Starts with query - always include
        if (movieTitle.startsWith(cleanQuery)) return true;
        
        // For multi-word queries, be more strict about phrase matching
        if (queryWords.length > 1) {
          // Check if the movie title contains the query as a phrase
          if (movieTitle.includes(cleanQuery)) {
            // For multi-word queries, only include if the phrase appears naturally
            // This helps avoid cases like "The Lego Batman Movie" when searching for "The Batman"
            const beforeQuery = movieTitle.substring(0, movieTitle.indexOf(cleanQuery));
            const afterQuery = movieTitle.substring(movieTitle.indexOf(cleanQuery) + cleanQuery.length);
            
            // If the query appears at the very beginning, include it
            if (beforeQuery === '') return true;
            
            // If the query appears at the end, include it
            if (afterQuery === '') return true;
            
            // If there's a space before and after the query, include it
            if ((beforeQuery.endsWith(' ') || beforeQuery === '') && 
                (afterQuery.startsWith(' ') || afterQuery === '')) {
              return true;
            }
            
            // For "The Batman" type queries, be more restrictive
            if (cleanQuery.startsWith('the ')) {
              const withoutThe = cleanQuery.substring(4); // Remove "the "
              // Only include if the movie title starts with "the" and contains the rest
              if (movieTitle.startsWith('the ') && movieTitle.includes(withoutThe)) {
                return true;
              }
              return false;
            }
            
            return false;
          }
          
          return false;
        }
        
        // For single word queries, allow partial matches but be smart about it
        if (movieTitle.includes(cleanQuery)) {
          // If the query is a complete word in the title, include it
          const movieWords = movieTitle.split(/\s+/);
          if (movieWords.some(word => word === cleanQuery)) return true;
          
          // If the query appears at the beginning of a word, include it
          if (movieWords.some(word => word.startsWith(cleanQuery))) return true;
          
          // For very short queries (1-2 characters), be more restrictive
          if (cleanQuery.length <= 2) {
            return movieWords.some(word => word === cleanQuery);
          }
          
          return true;
        }
        
        return false;
      });

      // Sort results by relevance (exact matches first, then starts with, then contains)
      const sortedMovies = filteredMovies.sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();
        
        // Exact match gets highest priority
        if (aTitle === cleanQuery && bTitle !== cleanQuery) return -1;
        if (bTitle === cleanQuery && aTitle !== cleanQuery) return 1;
        
        // Starts with gets second priority
        if (aTitle.startsWith(cleanQuery) && !bTitle.startsWith(cleanQuery)) return -1;
        if (bTitle.startsWith(cleanQuery) && !aTitle.startsWith(cleanQuery)) return 1;
        
        // Otherwise, sort alphabetically
        return aTitle.localeCompare(bTitle);
      });

      return sortedMovies;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw new Error('Failed to search movies');
    }
  },

  fetchAdditionalMovies: async (count: number): Promise<Movie[]> => {
    try {
      const omdbMovies = await omdbService.getRandomMovies(count);
      
      const additionalMovies: Movie[] = omdbMovies.map(omdbMovie => ({
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
  
      return additionalMovies;
    } catch (error) {
      console.error('Error fetching additional movies:', error);
      return [];
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

  getByTitle: async (title: string): Promise<Movie | null> => {
    try {
      const cleanTitle = title.trim().toLowerCase();
      const movie = await prisma.movie.findFirst({
        where: {
          title: {
            equals: cleanTitle,
            mode: 'insensitive'
          }
        }
      });
      return movie;
    } catch (error) {
      console.error('Error fetching movie by title:', error);
      throw new Error('Failed to fetch movie by title');
    }
  },

  add: async (movieData: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>): Promise<Movie> => {
    try {
      const newMovie = await prisma.movie.create({
        data: {
          title: movieData.title,
          director: movieData.director,
          year: movieData.year,
          genre: movieData.genre,
          runtime: movieData.runtime,
          img: movieData.img
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

  checkTitleExists: async (title: string): Promise<boolean> => {
    try {
      const cleanTitle = title.trim().toLowerCase();
      
      // Check in database first
      const dbMovie = await prisma.movie.findFirst({
        where: {
          title: {
            equals: cleanTitle,
            mode: 'insensitive'
          }
        }
      });

      if (dbMovie) {
        return true;
      }

      // Check in OMDb API
      try {
        const omdbMovies = await omdbService.searchMoviesWithDetails(title, 5);
        
        // Check if any movie title matches exactly (case insensitive)
        const exactMatch = omdbMovies.some(movie => 
          movie.Title.toLowerCase() === cleanTitle
        );

        if (exactMatch) {
          return true;
        }

        // Also check for partial matches (title contains the search term)
        const partialMatch = omdbMovies.some(movie => 
          movie.Title.toLowerCase().includes(cleanTitle) ||
          cleanTitle.includes(movie.Title.toLowerCase())
        );

        return partialMatch;
      } catch (error) {
        console.error('Error checking OMDb API:', error);
        return false;
      }
    } catch (error) {
      console.error('Error checking title existence:', error);
      return false;
    }
  },

  delete: async (id: number): Promise<boolean> => {
    try {
      // Check if it's a database movie (positive ID)
      if (id > 0) {
        const movie = await prisma.movie.findUnique({
          where: { id }
        });

        if (!movie) {
          return false; // Movie not found in database
        }

        if (movie.action === 'deleted') {
          // If the movie is already marked as deleted, do nothing
          return true;
        }

        // Mark as deleted instead of actually deleting
        await prisma.movie.update({
          where: { id },
          data: { action: 'deleted' }
        });
        return true;
      } else {
        // It's an OMDb movie (negative ID), we need to add it to database with action = deleted
        // Since we don't have the movie data, we'll need to get it from the request
        // For now, we'll return false and handle this in the controller
        return false;
      }
    } catch (error) {
      console.error('Error deleting movie:', error);
      throw new Error('Failed to delete movie');
    }
  },
};