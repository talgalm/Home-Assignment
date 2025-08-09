import { Request, Response } from 'express';
import { userRepository } from '../repositories/user.repository';

export const UsersController = {
  create: async (req: Request, res: Response) => {
    try {
      const { username } = req.body;
      if (!username?.trim()) {
        return res.status(400).json({ message: 'Username is required' });
      }

      const existingUser = await userRepository.findByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      const newUser = await userRepository.createUser(username);
      return res.status(201).json(newUser);
    } catch (error) {
      console.error('Error in create user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};