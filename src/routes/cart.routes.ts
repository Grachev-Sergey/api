import * as express from 'express';

import cartControllers from '../controllers/cartControllers';

import { verifyToken } from '../middleware/verifyToken';

const cartRouter = express.Router();
cartRouter.use(verifyToken);

cartRouter.post('/', cartControllers.addToCart);
cartRouter.delete('/', cartControllers.removeBookFromCart);
cartRouter.get('/', cartControllers.getBooksFromCart);
cartRouter.delete('/all', cartControllers.removeAllBooksFromCart);
cartRouter.patch('/add-copy/:bookId', cartControllers.addCopyToCart);
cartRouter.patch('/remove-copy/:bookId', cartControllers.removeCopyFromCart);

export { cartRouter };
