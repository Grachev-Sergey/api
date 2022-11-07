import * as express from 'express';
import { addGenre } from '../controllers/genreControllers/addGenres';
import { getAllGenres } from '../controllers/genreControllers/getAllGenres';

const genreRouter = express.Router();

genreRouter.post('/addgenre', addGenre);
genreRouter.get('/', getAllGenres);

export { genreRouter };
