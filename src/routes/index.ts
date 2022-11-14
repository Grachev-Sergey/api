import * as express from 'express';
import { authenticationRouter } from './authentication.routes';
import { userRouter } from './user.routes';
import { bookRouter } from './book.routes';
import { genreRouter } from './genre.routes';
import { ratingRouter } from './rating.routes';

const router = express.Router();

router.use('/', authenticationRouter);
router.use('/user', userRouter);
router.use('/book', bookRouter);
router.use('/genres', genreRouter);
router.use('/rating', ratingRouter);

export default router;
