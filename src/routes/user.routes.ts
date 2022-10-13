import * as express from 'express';
import { tokenVerification } from '../middleware/tokenVerification';
import userControllers from '../controllers/userControllers';
import { validationSchema } from '../middleware/validationSchema';
import schema from '../schema';

const userRouter = express.Router();

userRouter.get('/',
  tokenVerification,
  userControllers.getUser);
userRouter.get('/all',
  tokenVerification,
  userControllers.getUsers);
userRouter.put('/changeinfo',
  tokenVerification,
  validationSchema(schema.updateUserInfoSchema),
  userControllers.updateUserInfo);
userRouter.put('/changepass',
  tokenVerification,
  validationSchema(schema.updateUserPassSchema),
  userControllers.updateUserPass);
userRouter.put('/uploadphoto',
  tokenVerification,
  userControllers.updateUserPhoto);
userRouter.delete('/:id',
  tokenVerification,
  userControllers.deleteUser);

export { userRouter };
