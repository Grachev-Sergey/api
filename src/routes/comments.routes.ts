import * as express from 'express';
import commentsControllers from '../controllers/commentsControllers';

const commentsRouter = express.Router();

commentsRouter.post('/add', commentsControllers.addComment);
commentsRouter.get('/:id', commentsControllers.getComments);

export { commentsRouter };
