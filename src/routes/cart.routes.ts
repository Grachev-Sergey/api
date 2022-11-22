import * as express from 'express';
import cartControllers from '../controllers/cartControllers';

const cartRouter = express.Router();

cartRouter.post('/', cartControllers.addToCart);
cartRouter.delete('/', cartControllers.removeBookFromCart);
cartRouter.get('/', cartControllers.getBooksFromCart);

export { cartRouter };
