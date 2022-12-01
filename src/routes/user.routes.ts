import * as express from 'express';

import { tokenVerification } from '../middleware/tokenVerification';
import { validationSchema } from '../middleware/validationSchema';

import userControllers from '../controllers/userControllers';

import schema from '../schema';

const userRouter = express.Router();
userRouter.use(tokenVerification);

userRouter.get('/',
  userControllers.getUser);
userRouter.get('/getById/:id', userControllers.getUserById);
userRouter.get('/all',
  userControllers.getUsers);
userRouter.patch('/changeinfo',
  validationSchema(schema.updateUserInfoSchema),
  userControllers.updateUserInfo);
userRouter.patch('/changepass',
  validationSchema(schema.updateUserPassSchema),
  userControllers.updateUserPass);
userRouter.patch('/uploadphoto',
  userControllers.updateUserPhoto);
userRouter.delete('/:id',
  userControllers.deleteUser);

export { userRouter };
