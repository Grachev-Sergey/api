import * as express from 'express';

import { applyValidationSchema } from '../middleware/applyValidationSchema';
import schema from '../validationSchemas';
import { verifyToken } from '../middleware/verifyToken';

import { changeRating } from '../controllers/ratingControllers/changeRating';

const ratingRouter = express.Router();

ratingRouter.post('/', applyValidationSchema(schema.ratingSchemas.changeRatingSchema, 'body'), verifyToken, changeRating);

export { ratingRouter };
