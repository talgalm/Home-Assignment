/**
 * Formats a movie title by:
 * 1. Removing non-English letters and special characters
 * 2. Capitalizing the first letter of each word
 * 3. Making all other letters lowercase
 */
export const formatMovieTitle = (title: string): string => {
  if (!title) return '';
  
  // Remove non-English letters and special characters, keep spaces
  const cleanedTitle = title
    .replace(/[^a-zA-Z\s]/g, '') // Remove non-English letters and special characters
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim(); // Remove leading/trailing spaces
  
  // Split into words, capitalize first letter of each word, lowercase the rest
  const formattedWords = cleanedTitle
    .split(' ')
    .map(word => {
      if (!word) return '';
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .filter(word => word.length > 0); // Remove empty words
  
  return formattedWords.join(' ');
};
