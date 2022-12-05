import * as express from 'express';

import { addComment } from '../controllers/commentsControllers/addComment';

import { verifyToken } from '../middleware/verifyToken';

const commentsRouter = express.Router();

commentsRouter.post('/add', verifyToken, addComment);

export { commentsRouter };
