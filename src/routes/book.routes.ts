import * as express from 'express';

import booksControllers from '../controllers/booksControllers';
import { applyValidationSchema } from '../middleware/applyValidationSchema';
import schema from '../validationSchemas';

const bookRouter = express.Router();

bookRouter.get('/', booksControllers.getAllBooks);
bookRouter.get('/filtred-books', applyValidationSchema(schema.bookSchemas.getFiltredBooksSchema, 'query'), booksControllers.getFiltredBooks);
bookRouter.get('/recommendations', applyValidationSchema(schema.bookSchemas.getRecommendedBooksSchema, 'query'), booksControllers.getRecommendedBooks);
bookRouter.get('/:bookId', applyValidationSchema(schema.bookSchemas.getOneBookSchema, 'params'), booksControllers.getOneBook);
bookRouter.post('/add-book', applyValidationSchema(schema.bookSchemas.addBookSchema, 'body'), booksControllers.addBook);
bookRouter.patch('/:bookId', applyValidationSchema(schema.bookSchemas.updateBookSchema, 'body'), booksControllers.updateBook);
bookRouter.delete('/:bookId', applyValidationSchema(schema.bookSchemas.deleteBookSchema, 'params'), booksControllers.deleteBook);
export { bookRouter };
