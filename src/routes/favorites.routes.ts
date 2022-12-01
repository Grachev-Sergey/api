import * as express from 'express';

import favoritesControllers from '../controllers/favoritesControllers';

import { tokenVerification } from '../middleware/tokenVerification';

const favoritesRouter = express.Router();
favoritesRouter.use(tokenVerification);

favoritesRouter.post('/', favoritesControllers.addToFavorites);
favoritesRouter.delete('/', favoritesControllers.removeFromFavorites);
favoritesRouter.get('/', favoritesControllers.getFavorites);

export { favoritesRouter };
