import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';

import { errorsHandler } from './middleware/errorsHandler';

import router from './routes';
import { config } from './config';

export const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: [config.frontPort],
}));
app.use(express.static(path.resolve(__dirname, '..', 'static')));
app.use('/api', router);
app.use(errorsHandler);
