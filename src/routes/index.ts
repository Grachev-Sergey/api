import * as express from 'express';

import { authenticationRouter } from './authentication.routes';
import { userRouter } from './user.routes';
import { bookRouter } from './book.routes';
import { genreRouter } from './genre.routes';
import { ratingRouter } from './rating.routes';
import { favoritesRouter } from './favorites.routes';
import { commentsRouter } from './comments.routes';
import { cartRouter } from './cart.routes';

const router = express.Router();

router.use('/auth', authenticationRouter);
router.use('/user', userRouter);
router.use('/book', bookRouter);
router.use('/genres', genreRouter);
router.use('/rating', ratingRouter);
router.use('/favorite', favoritesRouter);
router.use('/comment', commentsRouter);
router.use('/cart', cartRouter);

export default router;
