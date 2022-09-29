import * as express from 'express';
import { tokenVerification } from '../middleware/tokenVerification';
import userControllers from '../controllers/userControllers';

const userRouter = express.Router();

userRouter.get('/read', tokenVerification, userControllers.getUsers);
userRouter.put('/update/:id', tokenVerification, userControllers.updateUser);
userRouter.delete('/delete/:id', tokenVerification, userControllers.deleteUser);

export {userRouter};