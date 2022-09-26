import * as express from 'express';
import { deleteUser } from '../../../controllers/userControllers/deleteUser';
import { getUsers } from '../../../controllers/userControllers/getUsers';
import { updateUser } from '../../../controllers/userControllers/updateUser';
import { tokenVerification } from '../../middlewere/tokenVerification';

const userRouter = express.Router();

userRouter.get('/read', tokenVerification, getUsers);
userRouter.put('/update/:id', tokenVerification, updateUser);
userRouter.delete('/delete/:id', tokenVerification, deleteUser);

export {userRouter};