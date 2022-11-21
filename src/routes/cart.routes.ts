import * as express from 'express';
import cartControllers from '../controllers/cartControllers';

const cartRouter = express.Router();

cartRouter.post('/', cartControllers.addToCart);
cartRouter.delete('/', cartControllers.removeBookFromCart);

export { cartRouter };
