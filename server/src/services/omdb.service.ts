import axios from 'axios';
import { OMDbDetailResponse, OMDbMovie, OMDbSearchResponse } from '../models/ExternalMovie/OMDB.interface';

class OMDbService {
  private apiKey: string;
  private baseUrl: string = 'http://www.omdbapi.com/';

  constructor() {
    this.apiKey = process.env.OMDB_API_KEY || 'demo';
  }

  async searchMovies(query: string, page: number = 1): Promise<OMDbSearchResponse> {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          apikey: this.apiKey,
          s: query,
          type: 'movie',
          page: page
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw new Error('Failed to search movies from OMDb');
    }
  }

  async searchMoviesWithDetails(query: string, limit: number = 5): Promise<OMDbMovie[]> {
    try {
      const searchResponse = await this.searchMovies(query, 1);
      
      if (searchResponse.Response === 'False' || !searchResponse.Search) {
        return [];
      }

      const movies: OMDbMovie[] = [];
      const searchResults = searchResponse.Search.slice(0, limit);

      for (const result of searchResults) {
        try {
          const detailResponse = await this.getMovieDetails(result.imdbID);
          
          if (detailResponse.Response === 'True' && detailResponse.Director) {
            movies.push({
              Title: detailResponse.Title,
              Year: detailResponse.Year,
              Director: detailResponse.Director,
              Genre: detailResponse.Genre,
              Runtime: detailResponse.Runtime,
              Poster: detailResponse.Poster,
              imdbID: detailResponse.imdbID
            });
          }
        } catch (error) {
          console.error(`Error getting details for ${result.imdbID}:`, error);
          continue;
        }
      }

      return movies;
    } catch (error) {
      console.error('Error searching movies with details:', error);
      return [];
    }
  }

  private async getMovieDetails(imdbId: string): Promise<OMDbDetailResponse> {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          apikey: this.apiKey,
          i: imdbId,
          plot: 'short'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting movie details:', error);
      throw new Error('Failed to get movie details from OMDb');
    }
  }

  async getRandomMovies(count: number): Promise<OMDbMovie[]> {
    try {
      // First, try to get a real API key test
      const testResponse = await axios.get(this.baseUrl, {
        params: {
          apikey: this.apiKey,
          s: 'Batman',
          type: 'movie',
          page: 1
        }
      });

      // If we get an error response, return empty array
      if (testResponse.data.Response === 'False' || testResponse.data.Error) {
        console.log('OMDb API error, returning empty array');
        return [];
      }

      // Popular movie titles to search for
      const popularTitles = [
        'Batman', 'Spider-Man', 'Iron Man', 'Avengers', 'Star Wars',
        'Harry Potter', 'Lord of the Rings', 'Jurassic Park', 'Titanic',
        'The Matrix', 'Inception', 'Interstellar', 'Fight Club', 'Forrest Gump',
        'The Lion King', 'Frozen', 'Toy Story', 'Finding Nemo', 'Shrek',
        'The Dark Knight', 'Joker', 'Wonder Woman', 'Black Panther', 'Thor'
      ];

      const movies: OMDbMovie[] = [];
      const usedIds = new Set<string>();

      // Shuffle the titles for randomness
      const shuffledTitles = [...popularTitles].sort(() => Math.random() - 0.5);

      for (const title of shuffledTitles) {
        if (movies.length >= count) break;

        try {
          // Search for movies with this title
          const searchResponse = await this.searchMovies(title, 1);
          
          if (searchResponse.Response === 'True' && searchResponse.Search) {
            // Shuffle the search results for randomness
            const shuffledResults = [...searchResponse.Search].sort(() => Math.random() - 0.5);
            
            for (const result of shuffledResults) {
              if (movies.length >= count) break;
              
              // Skip if we already have this movie
              if (usedIds.has(result.imdbID)) continue;
              
              try {
                // Get detailed information for this movie
                const detailResponse = await this.getMovieDetails(result.imdbID);
                
                if (detailResponse.Response === 'True' && detailResponse.Director) {
                  movies.push({
                    Title: detailResponse.Title,
                    Year: detailResponse.Year,
                    Director: detailResponse.Director,
                    Genre: detailResponse.Genre,
                    Runtime: detailResponse.Runtime,
                    Poster: detailResponse.Poster,
                    imdbID: detailResponse.imdbID
                  });
                  usedIds.add(result.imdbID);
                }
              } catch (error) {
                console.error(`Error getting details for ${result.imdbID}:`, error);
                continue;
              }
            }
          }
        } catch (error) {
          console.error(`Error searching for ${title}:`, error);
          continue;
        }
      }

      // Return whatever movies we got, even if less than requested
      return movies;
    } catch (error) {
      console.error('Error getting random movies from OMDb, returning empty array:', error);
      return [];
    }
  }
}

export default new OMDbService(); 
