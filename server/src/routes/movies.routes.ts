import { Router } from 'express';
import { MoviesController } from '../controllers/movies.controller';

const router = Router();

router.get('/', MoviesController.getAll);
router.get('/:id', MoviesController.getById);
router.post('/', MoviesController.add);
router.put('/:id', MoviesController.update);
router.delete('/:id', MoviesController.delete);

export default router;