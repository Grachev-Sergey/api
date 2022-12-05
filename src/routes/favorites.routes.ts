import * as express from 'express';

import favoritesControllers from '../controllers/favoritesControllers';

import { verifyToken } from '../middleware/verifyToken';

const favoritesRouter = express.Router();
favoritesRouter.use(verifyToken);

favoritesRouter.post('/', favoritesControllers.addToFavorites);
favoritesRouter.delete('/', favoritesControllers.removeFromFavorites);
favoritesRouter.get('/', favoritesControllers.getFavorites);

export { favoritesRouter };
