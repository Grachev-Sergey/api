import * as express from 'express';

import { verifyToken } from '../middleware/verifyToken';
import { applyValidationSchema } from '../middleware/applyValidationSchema';

import userControllers from '../controllers/userControllers';

import schema from '../validationSchemas';

const userRouter = express.Router();
userRouter.use(verifyToken);

userRouter.get('/', userControllers.getUser);
userRouter.get('/all', userControllers.getUsers);
userRouter.patch('/change-info', applyValidationSchema(schema.updateUserInfoSchema), userControllers.updateUserInfo);
userRouter.patch('/change-pass', applyValidationSchema(schema.updateUserPassSchema), userControllers.updateUserPass);
userRouter.patch('/upload-photo', userControllers.updateUserPhoto);
userRouter.delete('/:userId', userControllers.deleteUser);

export { userRouter };
