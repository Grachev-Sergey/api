import * as express from 'express';
import { login } from '../../../controllers/authenticationControllers/login';
import { registrationUser } from '../../../controllers/authenticationControllers/registration';

const authenticationRouter = express.Router();

authenticationRouter.post('/registration', registrationUser);
authenticationRouter.post('/login', login);

export {authenticationRouter};