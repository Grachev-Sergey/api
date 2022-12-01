import * as express from 'express';

import { changeRating } from '../controllers/ratingControllers/changeRating';

import { tokenVerification } from '../middleware/tokenVerification';

const ratingRouter = express.Router();

ratingRouter.post('/', tokenVerification, changeRating);

export { ratingRouter };
