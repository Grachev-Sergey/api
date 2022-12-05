import * as express from 'express';

import { changeRating } from '../controllers/ratingControllers/changeRating';

import { verifyToken } from '../middleware/verifyToken';

const ratingRouter = express.Router();

ratingRouter.post('/', verifyToken, changeRating);

export { ratingRouter };
