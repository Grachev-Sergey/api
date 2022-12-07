import * as express from 'express';

import cartControllers from '../controllers/cartControllers';

import { verifyToken } from '../middleware/verifyToken';
import { applyValidationSchema } from '../middleware/applyValidationSchema';
import schema from '../validationSchemas';

const cartRouter = express.Router();
cartRouter.use(verifyToken);

cartRouter.get('/', applyValidationSchema(schema.cartSchemas.getBooksFromCartSchema, 'query'), cartControllers.getBooksFromCart);
cartRouter.post('/', applyValidationSchema(schema.cartSchemas.addToCartSchema, 'body'), cartControllers.addToCart);
cartRouter.patch('/add-copy/:bookId', applyValidationSchema(schema.cartSchemas.addCopyToCartSchema, 'params'), cartControllers.addCopyToCart);
cartRouter.patch('/remove-copy/:bookId', applyValidationSchema(schema.cartSchemas.removeCopyFromCartSchema, 'params'), cartControllers.removeCopyFromCart);
cartRouter.delete('/', applyValidationSchema(schema.cartSchemas.removeBookFromCartSchema, 'query'), cartControllers.removeBookFromCart);
cartRouter.delete('/all', applyValidationSchema(schema.cartSchemas.removeAllBooksFromCartSchema, 'query'), cartControllers.removeAllBooksFromCart);

export { cartRouter };
