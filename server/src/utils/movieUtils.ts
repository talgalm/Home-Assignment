import { Movie } from "@prisma/client";

export function multiWordPhraseMatches(title: string, phrase: string): boolean {
    const index = title.indexOf(phrase);
    if (index === -1) return false;
    const before = title.substring(0, index);
    const after = title.substring(index + phrase.length);
  
    if (before === '' || after === '') return true;
    if ((before.endsWith(' ') || before === '') && (after.startsWith(' ') || after === '')) return true;
  
    if (phrase.startsWith('the ')) {
      const withoutThe = phrase.substring(4);
      if (title.startsWith('the ') && title.includes(withoutThe)) return true;
      return false;
    }
  
    return false;
  }
  
  export function singleWordMatches(title: string, word: string): boolean {
    const words = title.split(/\s+/);
    if (words.includes(word)) return true;
    if (words.some(w => w.startsWith(word))) return true;
    if (word.length <= 2) return words.includes(word);
    return false;
  }


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


  export function sortMoviesByRelevance(movies: Movie[], query: string): Movie[] {
    const cleanQuery = query.trim().toLowerCase();
  
    return movies.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
  
      if (aTitle === cleanQuery && bTitle !== cleanQuery) return -1;
      if (bTitle === cleanQuery && aTitle !== cleanQuery) return 1;
  
      if (aTitle.startsWith(cleanQuery) && !bTitle.startsWith(cleanQuery)) return -1;
      if (bTitle.startsWith(cleanQuery) && !aTitle.startsWith(cleanQuery)) return 1;
  
      return aTitle.localeCompare(bTitle);
    });
  }