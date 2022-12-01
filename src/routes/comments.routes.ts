import * as express from 'express';

import { addComment } from '../controllers/commentsControllers/addComment';

import { tokenVerification } from '../middleware/tokenVerification';

const commentsRouter = express.Router();

commentsRouter.post('/add', tokenVerification, addComment);

export { commentsRouter };
