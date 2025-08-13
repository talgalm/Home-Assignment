import { Request, Response } from 'express';
import { MoviesService } from '../services/movies.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const MoviesController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 0;
      
      if (page < 0) {
        return res.status(400).json({ message: 'Page number must be 1 or greater' });
      }

      const result = await MoviesService.getAll(page);
      res.json(result);
    } catch (error) {
      console.error('Error in getAll:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  search: async (req: Request, res: Response) => {
    try {
      const { query } = req.query;
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ message: 'Query parameter is required' });
      }

      const movies = await MoviesService.search(query);
      res.json(movies);
    } catch (error) {
      console.error('Error in search:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const movie = await MoviesService.getById(Number(req.params.id));
      if (movie) {
        res.json(movie);
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    } catch (error) {
      console.error('Error in getById:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  add: async (req: Request, res: Response) => {
    try {
      console.log("--- loger ----");
      console.log(req.body);
      const { title, director, year, genre, runtime, img, username } = req.body;
      if (!title || !director || !year || !genre || !runtime || !username) {
        return res.status(400).json({ message: 'Missing required fields: title, director, year, genre, runtime' });
      }
      console.log("--- loger 2 ----");
      const newMovie = await MoviesService.add({ 
        title, 
        director, 
        year, 
        genre, 
        runtime, 
        img, 
        action: null,
        username: username || 'default_user'
      });

      console.log("--- loger 3 ----");
      res.status(201).json(newMovie);
    } catch (error) {
      console.log('Error in add:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { title, director, year, genre, runtime, img, action } = req.body;
      const id = Number(req.params.id);
      
      if (!title && !director && !year && !genre && !runtime && !img && action === undefined) {
        return res.status(400).json({ message: 'At least one field is required' });
      }
      
      const updateData: any = {};
      if (title) updateData.title = title;
      if (director) updateData.director = director;
      if (year) updateData.year = year;
      if (genre) updateData.genre = genre;
      if (runtime) updateData.runtime = runtime;
      if (img !== undefined) updateData.img = img;
      if (action !== undefined) updateData.action = action;
      
      const updatedMovie = await MoviesService.update(id, updateData);
      if (updatedMovie) {
        res.json(updatedMovie);
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    } catch (error) {
      console.error('Error in update:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  checkTitleExists: async (req: Request, res: Response) => {
    try {
      const { title } = req.query;
      
      if (!title || typeof title !== 'string') {
        return res.status(400).json({ message: 'Title parameter is required' });
      }

      const exists = await MoviesService.checkTitleExists(title);
      res.json({ exists });
    } catch (error) {
      console.error('Error in checkTitleExists:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const { title } = req.body;
      let exists;
      if (title) {
        exists = await MoviesService.getByTitle(title);
      }
      if (exists === null) {
        const { title, director, year, genre, runtime, img } = req.body;
        if (!title || !director || !year || !genre || !runtime) {
          return res.status(400).json({ message: 'Missing required fields for OMDb movie deletion' });
        }

        const deletedMovie = await prisma.movie.create({
          data: {
            title,
            director,
            year,
            genre,
            runtime,
            img,
            action: 'deleted',
            username: 'default_user' // Default username for deleted external movies
          }
        });
        res.json({ message: 'OMDb movie marked as deleted', movie: deletedMovie });
      } else {
        const success = await MoviesService.delete(id);
        if (success) {
          res.json({ message: 'Movie deleted' });
        } else {
          res.status(404).json({ message: 'Movie not found' });
        }
      }
    } catch (error) {
      console.error('Error in delete:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  addFavorite: async (req: Request, res: Response) => {
    try {
      const { title, director, year, genre, runtime, img, username } = req.body;
      
      if (!username) {
        return res.status(400).json({ message: 'Username is required' });
      }
      
      if (!title || !director || !year || !genre || !runtime) {
        return res.status(400).json({ message: 'Missing required fields: title, director, year, genre, runtime' });
      }

      const favoriteMovie = await MoviesService.addFavorite({
        title,
        director,
        year,
        genre,
        runtime,
        img,
        username,
        action: 'favorite'
      });
      
      res.status(201).json(favoriteMovie);
    } catch (error) {
      console.error('Error in addFavorite:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  deleteFavorite: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid movie ID' });
      }

      const success = await MoviesService.deleteFavorite(id);
      
      if (success) {
        res.json({ message: 'Favorite removed successfully' });
      } else {
        res.status(404).json({ message: 'Favorite movie not found' });
      }
    } catch (error) {
      console.error('Error in deleteFavorite:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getFavorites: async (req: Request, res: Response) => {
    try {
      const { username } = req.params;
      
      if (!username) {
        return res.status(400).json({ message: 'Username is required' });
      }

      const favorites = await MoviesService.getFavoritesByUsername(username);
      res.json(favorites);
    } catch (error) {
      console.error('Error in getFavorites:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};