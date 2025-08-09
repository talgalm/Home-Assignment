import { Router } from 'express';
import { MoviesController } from '../controllers/movies.controller';

const router = Router();

router.get('/', MoviesController.getAll);
router.get('/search', MoviesController.search);
router.get('/check-title', MoviesController.checkTitleExists);
router.get('/favorites/:username', MoviesController.getFavorites);
router.get('/:id', MoviesController.getById);
router.post('/', MoviesController.add);
router.post('/add-favorite', MoviesController.addFavorite);
router.put('/:id', MoviesController.update);
router.delete('/:id', MoviesController.delete);
router.delete('/delete-favorite/:id', MoviesController.deleteFavorite);

export default router;