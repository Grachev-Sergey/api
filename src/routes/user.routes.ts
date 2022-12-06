import * as express from 'express';

import { verifyToken } from '../middleware/verifyToken';
import { applyValidationSchema } from '../middleware/applyValidationSchema';

import userControllers from '../controllers/userControllers';

import schema from '../validationSchemas';

const userRouter = express.Router();
userRouter.use(verifyToken);

userRouter.get('/', userControllers.getUser);
userRouter.get('/all', userControllers.getUsers);
userRouter.patch('/change-info', applyValidationSchema(schema.updateUserSchema.updateUserInfoSchema, 'body'), userControllers.updateUserInfo);
userRouter.patch('/change-pass', applyValidationSchema(schema.updateUserSchema.updateUserPassSchema, 'body'), userControllers.updateUserPass);
userRouter.patch('/upload-photo', applyValidationSchema(schema.updateUserSchema.updateUserPhotoSchema, 'body'), userControllers.updateUserPhoto);
userRouter.delete('/:userId', applyValidationSchema(schema.updateUserSchema.updateUserPhotoSchema, 'params'), userControllers.deleteUser);

export { userRouter };
