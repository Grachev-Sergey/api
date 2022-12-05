import * as express from 'express';

import { applyValidationSchema } from '../middleware/applyValidationSchema';

import authControllers from '../controllers/authControllers';

import schema from '../validationSchemas';

const authenticationRouter = express.Router();

authenticationRouter.post('/sign-up', applyValidationSchema(schema.signUpSchema), authControllers.signUp);
authenticationRouter.post('/sign-in', applyValidationSchema(schema.signInSchema), authControllers.signIn);

export { authenticationRouter };
