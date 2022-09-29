import * as express from 'express';
import { authenticationRouter } from './authentication.routes';
import { userRouter } from './user.routes';

const router = express.Router();

router.use('/auth', authenticationRouter);
router.use('/user', userRouter);

export default router;