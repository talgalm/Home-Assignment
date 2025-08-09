export interface Movie {
  id: number;
  title: string;
  year: string;
  director: string;
  genre: string;
  runtime: string;
  img?: string | null; // Added for optional image
  action?: string | null; // Added for action field
  username: string; // Username of the movie owner
  createdAt?: Date;
  updatedAt?: Date;
}
