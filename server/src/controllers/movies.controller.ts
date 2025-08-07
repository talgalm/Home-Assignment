import { Request, Response } from 'express';
import { MoviesService } from '../services/movies.service';

export const MoviesController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const movies = await MoviesService.getAll();
      res.json(movies);
    } catch (error) {
      console.error('Error in getAll:', error);
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
      const { title, director, year } = req.body;
      if (!title || !director || !year) {
        return res.status(400).json({ message: 'Missing fields' });
      }
      const newMovie = await MoviesService.add({ title, director, year });
      res.status(201).json(newMovie);
    } catch (error) {
      console.error('Error in add:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { title, director, year } = req.body;
      const id = Number(req.params.id);
      
      if (!title && !director && !year) {
        return res.status(400).json({ message: 'At least one field is required' });
      }
      
      const updateData: any = {};
      if (title) updateData.title = title;
      if (director) updateData.director = director;
      if (year) updateData.year = year;
      
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

  delete: async (req: Request, res: Response) => {
    try {
      const success = await MoviesService.delete(Number(req.params.id));
      if (success) {
        res.json({ message: 'Movie deleted' });
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    } catch (error) {
      console.error('Error in delete:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};