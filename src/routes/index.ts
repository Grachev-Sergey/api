import * as express from 'express';
import { authenticationRouter } from './authentication.routes';
import { userRouter } from './user.routes';
import { bookRouter } from './book.routes';

const router = express.Router();

router.use('/', authenticationRouter);
router.use('/user', userRouter);
router.use('/book', bookRouter);

export default router;
