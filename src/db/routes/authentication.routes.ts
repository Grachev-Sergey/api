import * as express from 'express';
import { login } from '../../controllers/authenticationControllers/login';
import { registrationUser } from '../../controllers/authenticationControllers/registration';
import { authorizationSchema } from '../../utils/schema/authorizationSchema';
import { registrationSchema } from '../../utils/schema/registrationSchema';
import { validationSchema } from '../middleware/validationSchema';

const authenticationRouter = express.Router();

authenticationRouter.post('/registration', validationSchema(registrationSchema), registrationUser);
authenticationRouter.post('/login', validationSchema(authorizationSchema), login);

export {authenticationRouter};