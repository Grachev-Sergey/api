import * as express from 'express';
import favoritesControllers from '../controllers/favoritesControllers';

const favoritesRouter = express.Router();

favoritesRouter.post('/add', favoritesControllers.addToFavorites);
favoritesRouter.post('/remove', favoritesControllers.removeFromFavorites);

export { favoritesRouter };
