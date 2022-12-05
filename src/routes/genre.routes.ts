import * as express from 'express';

import genreControllers from '../controllers/genreControllers';

const genreRouter = express.Router();

genreRouter.post('/add-genre', genreControllers.addGenre);
genreRouter.get('/', genreControllers.getAllGenres);

export { genreRouter };
