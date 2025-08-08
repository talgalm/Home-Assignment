import { Movie } from "@prisma/client";

export const generateOMDbId = (): number => {
  // Generate a random 9-digit number (100000000 to 2147483647 max)
  const min = 100000000;
  const max = 2147483647; // max 32-bit signed int
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function filterMoviesByQuery(movies: Movie[], query: string): Movie[] {
  const cleanQuery = query.trim().toLowerCase();
  const queryWords = cleanQuery.split(/\s+/).filter(word => word.length > 0);

  return movies.filter(movie => {
    const movieTitle = movie.title.toLowerCase();
    if (movieTitle === cleanQuery) return true;
    if (movieTitle.startsWith(cleanQuery)) return true;

    if (queryWords.length > 1) {
      if (movieTitle.includes(cleanQuery)) {
        const before = movieTitle.substring(0, movieTitle.indexOf(cleanQuery));
        const after = movieTitle.substring(movieTitle.indexOf(cleanQuery) + cleanQuery.length);
        if (before === '' || after === '') return true;
        if ((before.endsWith(' ') || before === '') && (after.startsWith(' ') || after === '')) return true;

        if (cleanQuery.startsWith('the ')) {
          const withoutThe = cleanQuery.substring(4);
          if (movieTitle.startsWith('the ') && movieTitle.includes(withoutThe)) return true;
          return false;
        }

        return false;
      }

      return false;
    }

    if (movieTitle.includes(cleanQuery)) {
      const movieWords = movieTitle.split(/\s+/);
      if (movieWords.some(word => word === cleanQuery)) return true;
      if (movieWords.some(word => word.startsWith(cleanQuery))) return true;
      if (cleanQuery.length <= 2) return movieWords.some(word => word === cleanQuery);
      return true;
    }

    return false;
  });
}

