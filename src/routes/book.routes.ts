import * as express from 'express';
import booksControllers from '../controllers/booksControllers';

const bookRouter = express.Router();

bookRouter.post('/addbook', booksControllers.addBook);
bookRouter.get('/', booksControllers.getAllBooks);
bookRouter.get('/:id', booksControllers.getOneBook);
bookRouter.put('/:id', booksControllers.updateBook);
bookRouter.delete('/:id', booksControllers.deleteBook);
export { bookRouter };
