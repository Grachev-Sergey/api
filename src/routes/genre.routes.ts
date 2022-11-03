import * as express from 'express';
import { getAllGenres } from '../controllers/genreControllers/getAllGenres';

const genreRouter = express.Router();

genreRouter.get('/', getAllGenres);

export { genreRouter };
