export const formatMovieTitle = (title: string): string => {
  if (!title) return '';
  
  const cleanedTitle = title
    .replace(/[^a-zA-Z\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  const formattedWords = cleanedTitle
    .split(' ')
    .map(word => {
      if (!word) return '';
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .filter(word => word.length > 0);
  
  return formattedWords.join(' ');
};
