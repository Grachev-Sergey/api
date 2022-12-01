import * as express from 'express';

import cartControllers from '../controllers/cartControllers';

import { tokenVerification } from '../middleware/tokenVerification';

const cartRouter = express.Router();
cartRouter.use(tokenVerification);

cartRouter.post('/', cartControllers.addToCart);
cartRouter.delete('/', cartControllers.removeBookFromCart);
cartRouter.get('/', cartControllers.getBooksFromCart);
cartRouter.delete('/all', cartControllers.removeAllBooksFromCart);
cartRouter.patch('/addcopy/:id', cartControllers.addCopyToCart);
cartRouter.patch('/removecopy/:id', cartControllers.removeCopyFromCart);

export { cartRouter };
