import * as express from 'express';
import { validationSchema } from '../middleware/validationSchema';
import authControllers from '../controllers/authControllers';
import schema from '../schema';

const authenticationRouter = express.Router();

authenticationRouter.post('/registration', validationSchema(schema.registrationSchema), authControllers.registrationUser);
authenticationRouter.post('/login', validationSchema(schema.authorizationSchema), authControllers.login);

export { authenticationRouter };
