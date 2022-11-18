import * as express from 'express';
import { addComment } from '../controllers/commentsControllers/addComment';

const commentsRouter = express.Router();

commentsRouter.post('/add', addComment);

export { commentsRouter };
