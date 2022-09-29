import * as express from 'express';
import { errorsHandler } from './middleware/errorsHandler';
import router from './routes';

export const app = express();

app.use(express.json());
app.use('/api', router);
app.use(errorsHandler);