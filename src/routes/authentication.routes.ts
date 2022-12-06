import * as express from 'express';

import { applyValidationSchema } from '../middleware/applyValidationSchema';

import authControllers from '../controllers/authControllers';

import schema from '../validationSchemas';

const authenticationRouter = express.Router();

authenticationRouter.post('/sign-up', applyValidationSchema(schema.authShema.signUpSchema, 'body'), authControllers.signUp);
authenticationRouter.post('/sign-in', applyValidationSchema(schema.authShema.signInSchema, 'body'), authControllers.signIn);

export { authenticationRouter };
