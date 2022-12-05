import * as express from 'express';

import booksControllers from '../controllers/booksControllers';

const bookRouter = express.Router();

bookRouter.post('/add-book', booksControllers.addBook);
bookRouter.get('/filtred-books', booksControllers.getFiltredBooks);
bookRouter.get('/recommendations', booksControllers.getRecommendedBooks);
bookRouter.get('/', booksControllers.getAllBooks);
bookRouter.get('/:bookId', booksControllers.getOneBook);
bookRouter.patch('/:bookId', booksControllers.updateBook);
bookRouter.delete('/:bookId', booksControllers.deleteBook);
export { bookRouter };
