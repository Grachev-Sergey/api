import * as express from 'express';

import { applyValidationSchema } from '../middleware/applyValidationSchema';
import { verifyToken } from '../middleware/verifyToken';
import schema from '../validationSchemas';

import favoritesControllers from '../controllers/favoritesControllers';

const favoritesRouter = express.Router();
favoritesRouter.use(verifyToken);

favoritesRouter.get('/', applyValidationSchema(schema.favoritesSchemas.getFavoritesSchema, 'query'), favoritesControllers.getFavorites);
favoritesRouter.post('/', applyValidationSchema(schema.favoritesSchemas.addToFavoritesSchema, 'body'), favoritesControllers.addToFavorites);
favoritesRouter.delete('/', applyValidationSchema(schema.favoritesSchemas.removeFromFavoritesSchema, 'query'), favoritesControllers.removeFromFavorites);

export { favoritesRouter };
