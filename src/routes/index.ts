import * as express from 'express';
import { authenticationRouter } from './authentication.routes';
import { userRouter } from './user.routes';
import { bookRouter } from './book.routes';
import { genreRouter } from './genre.routes';

const router = express.Router();

router.use('/', authenticationRouter);
router.use('/user', userRouter);
router.use('/book', bookRouter);
router.use('/genres', genreRouter);

export default router;
