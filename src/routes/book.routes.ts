import * as express from 'express';
import booksControllers from '../controllers/booksControllers';

const bookRouter = express.Router();

bookRouter.post('/addbook', booksControllers.addBook);
bookRouter.get('/', booksControllers.getAllBooks);
bookRouter.put('/:id', booksControllers.updateBook);
export { bookRouter };
