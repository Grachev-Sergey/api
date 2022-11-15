import * as express from 'express';
import { changeRating } from '../controllers/ratingControllers/changeRating';

const ratingRouter = express.Router();

ratingRouter.post('/', changeRating);

export { ratingRouter };
