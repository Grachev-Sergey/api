import { deleteUser } from '../../../controllers/userControllers/deleteUser';
import { getUsers } from '../../../controllers/userControllers/getUsers';
import { updateUser } from '../../../controllers/userControllers/updateUser';
import * as express from 'express';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export {userRouter};