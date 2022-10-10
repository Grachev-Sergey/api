import * as express from 'express';
import * as cors from 'cors';
import { errorsHandler } from './middleware/errorsHandler';
import router from './routes';
import { config } from './config';

export const app = express();

app.use(express.json());
app.use(cors({
  origin: [config.front],
}));
app.use('/api', router);
app.use(errorsHandler);
