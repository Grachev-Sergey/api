import * as express from 'express';
import favoritesControllers from '../controllers/favoritesControllers';

const favoritesRouter = express.Router();

favoritesRouter.post('/', favoritesControllers.addToFavorites);
favoritesRouter.delete('/', favoritesControllers.removeFromFavorites);

export { favoritesRouter };
