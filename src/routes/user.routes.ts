import * as express from 'express';
import { tokenVerification } from '../middleware/tokenVerification';
import userControllers from '../controllers/userControllers';

const userRouter = express.Router();

userRouter.get('/', tokenVerification, userControllers.getUsers);
userRouter.put('/:id', tokenVerification, userControllers.updateUser);
userRouter.delete('/:id', tokenVerification, userControllers.deleteUser);

export { userRouter };
