import * as express from 'express';
import { userRouter } from './routes/user.routes';
import { authenticationRouter } from './routes/authentication.routes';
import { responseError } from '../db/middlewere/responseError';

export const app = express();

app.use(express.json());
app.use(userRouter);
app.use(authenticationRouter);
app.use(responseError);