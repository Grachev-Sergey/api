import * as express from 'express';

import { addComment } from '../controllers/commentsControllers/addComment';

import { verifyToken } from '../middleware/verifyToken';
import { applyValidationSchema } from '../middleware/applyValidationSchema';
import schema from '../validationSchemas';

const commentsRouter = express.Router();

commentsRouter.post('/add', applyValidationSchema(schema.commentsSchema.addCommentSchema, 'body'), verifyToken, addComment);

export { commentsRouter };
