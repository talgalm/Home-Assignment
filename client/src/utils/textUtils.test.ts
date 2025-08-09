import { describe, it, expect } from 'vitest';
import { formatMovieTitle } from './textUtils';

describe('textUtils', () => {
  describe('formatMovieTitle', () => {
    it('formats movie title with proper capitalization', () => {
      const result = formatMovieTitle('the lord of the rings');
      expect(result).toBe('The Lord Of The Rings');
    });

    it('removes special characters except spaces', () => {
      const result = formatMovieTitle('the lord@#$ of the rings!!!');
      expect(result).toBe('The Lord Of The Rings');
    });

    it('handles multiple spaces correctly', () => {
      const result = formatMovieTitle('the    lord   of   the    rings');
      expect(result).toBe('The Lord Of The Rings');
    });

    it('handles empty string', () => {
      const result = formatMovieTitle('');
      expect(result).toBe('');
    });

    it('handles string with only special characters', () => {
      const result = formatMovieTitle('@#$%^&*()');
      expect(result).toBe('');
    });

    it('handles string with only spaces', () => {
      const result = formatMovieTitle('    ');
      expect(result).toBe('');
    });

    it('handles mixed case input', () => {
      const result = formatMovieTitle('ThE lOrD oF tHe RiNgS');
      expect(result).toBe('The Lord Of The Rings');
    });

    it('handles single word', () => {
      const result = formatMovieTitle('inception');
      expect(result).toBe('Inception');
    });

    it('handles already formatted title', () => {
      const result = formatMovieTitle('The Dark Knight');
      expect(result).toBe('The Dark Knight');
    });

    it('trims leading and trailing spaces', () => {
      const result = formatMovieTitle('  the matrix  ');
      expect(result).toBe('The Matrix');
    });
  });
});
