import * as express from 'express';

import { applyValidationSchema } from '../middleware/applyValidationSchema';
import schema from '../validationSchemas';

import authControllers from '../controllers/authControllers';

const authenticationRouter = express.Router();

authenticationRouter.post('/sign-up', applyValidationSchema(schema.authShemas.signUpSchema, 'body'), authControllers.signUp);
authenticationRouter.post('/sign-in', applyValidationSchema(schema.authShemas.signInSchema, 'body'), authControllers.signIn);

export { authenticationRouter };
