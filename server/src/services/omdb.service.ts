import axios from 'axios';

interface OMDbMovie {
  Title: string;
  Year: string;
  Director: string;
  Genre: string;
  Runtime: string;
  Poster: string;
  imdbID: string;
}

interface OMDbSearchResponse {
  Search: Array<{
    Title: string;
    Year: string;
    imdbID: string;
  }>;
  totalResults: string;
  Response: string;
}

interface OMDbDetailResponse {
  Title: string;
  Year: string;
  Director: string;
  Genre: string;
  Runtime: string;
  Poster: string;
  imdbID: string;
  Response: string;
}

class OMDbService {
  private apiKey: string;
  private baseUrl: string = 'http://www.omdbapi.com/';

  constructor() {
    // You'll need to get a free API key from http://www.omdbapi.com/apikey.aspx
    this.apiKey = process.env.OMDB_API_KEY || 'demo'; // Use 'demo' for testing
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

  private getFallbackMovies(count: number): OMDbMovie[] {
    const fallbackMovies: OMDbMovie[] = [
      {
        Title: "The Dark Knight",
        Year: "2008",
        Director: "Christopher Nolan",
        Genre: "Action, Crime, Drama",
        Runtime: "152 min",
        Poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
        imdbID: "tt0468569"
      },
      {
        Title: "Inception",
        Year: "2010",
        Director: "Christopher Nolan",
        Genre: "Action, Adventure, Sci-Fi",
        Runtime: "148 min",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        imdbID: "tt1375666"
      },
      {
        Title: "Interstellar",
        Year: "2014",
        Director: "Christopher Nolan",
        Genre: "Adventure, Drama, Sci-Fi",
        Runtime: "169 min",
        Poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        imdbID: "tt0816692"
      },
      {
        Title: "The Matrix",
        Year: "1999",
        Director: "Lana Wachowski, Lilly Wachowski",
        Genre: "Action, Sci-Fi",
        Runtime: "136 min",
        Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        imdbID: "tt0133093"
      },
      {
        Title: "Fight Club",
        Year: "1999",
        Director: "David Fincher",
        Genre: "Drama",
        Runtime: "139 min",
        Poster: "https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
        imdbID: "tt0137523"
      },
      {
        Title: "Forrest Gump",
        Year: "1994",
        Director: "Robert Zemeckis",
        Genre: "Drama, Romance",
        Runtime: "142 min",
        Poster: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        imdbID: "tt0109830"
      },
      {
        Title: "The Lion King",
        Year: "1994",
        Director: "Roger Allers, Rob Minkoff",
        Genre: "Animation, Adventure, Drama",
        Runtime: "88 min",
        Poster: "https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg",
        imdbID: "tt0110357"
      },
      {
        Title: "Toy Story",
        Year: "1995",
        Director: "John Lasseter",
        Genre: "Animation, Adventure, Comedy",
        Runtime: "81 min",
        Poster: "https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTdhMy00MmI5LWFkYjItYzVlYWM5NmI4ZDBiXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_SX300.jpg",
        imdbID: "tt0114709"
      },
      {
        Title: "Finding Nemo",
        Year: "2003",
        Director: "Andrew Stanton, Lee Unkrich",
        Genre: "Animation, Adventure, Comedy",
        Runtime: "100 min",
        Poster: "https://m.media-amazon.com/images/M/MV5BZjMxYzBiNjUtZDliNC00MDAyLWg4N2NiMDQxMWIxNGQ1YzYwXkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg",
        imdbID: "tt0266543"
      },
      {
        Title: "Shrek",
        Year: "2001",
        Director: "Andrew Adamson, Vicky Jenson",
        Genre: "Animation, Adventure, Comedy",
        Runtime: "90 min",
        Poster: "https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        imdbID: "tt0126029"
      }
    ];

    // Shuffle and return the requested number of movies
    return fallbackMovies
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
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

      // If we get an error response, use fallback movies
      if (testResponse.data.Response === 'False' || testResponse.data.Error) {
        console.log('OMDb API key is invalid or not available, using fallback movies');
        return this.getFallbackMovies(count);
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

      // If we couldn't get enough movies from the API, fill with fallback movies
      if (movies.length < count) {
        const remainingCount = count - movies.length;
        const fallbackMovies = this.getFallbackMovies(remainingCount);
        movies.push(...fallbackMovies);
      }

      return movies;
    } catch (error) {
      console.error('Error getting random movies from OMDb, using fallback:', error);
      return this.getFallbackMovies(count);
    }
  }
}

export default new OMDbService(); 
