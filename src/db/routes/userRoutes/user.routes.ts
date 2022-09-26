import { deleteUser } from '../../../controllers/userControllers/deleteUser';
import { getUsers } from '../../../controllers/userControllers/getUsers';
import { updateUser } from '../../../controllers/userControllers/updateUser';
import * as express from 'express';

const userRouter = express.Router();

userRouter.get('/read', getUsers);
userRouter.put('/update/:id', updateUser);
userRouter.delete('/delete/:id', deleteUser);

export {userRouter};