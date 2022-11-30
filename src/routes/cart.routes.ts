import * as express from 'express';
import cartControllers from '../controllers/cartControllers';

const cartRouter = express.Router();

cartRouter.post('/', cartControllers.addToCart);
cartRouter.delete('/', cartControllers.removeBookFromCart);
cartRouter.get('/', cartControllers.getBooksFromCart);
cartRouter.delete('/all', cartControllers.removeAllBooksFromCart);
cartRouter.patch('/addcopy/:id', cartControllers.addCopyToCart);
cartRouter.patch('/removecopy/:id', cartControllers.removeCopyFromCart);

export { cartRouter };
