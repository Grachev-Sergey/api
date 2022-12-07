import * as express from 'express';

import { applyValidationSchema } from '../middleware/applyValidationSchema';
import schema from '../validationSchemas';

import genreControllers from '../controllers/genreControllers';

const genreRouter = express.Router();

genreRouter.get('/', genreControllers.getAllGenres);
genreRouter.post('/add-genre', applyValidationSchema(schema.genreSchemas.addGenreSchema, 'body'), genreControllers.addGenre);

export { genreRouter };
