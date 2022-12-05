import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { repositorys } from '../../db';

import succsessMessage from '../../utils/succsessMessage';
import { customError } from '../../utils/createCustomError';
import errorsMessage from '../../utils/errorsMessage';

type ParamsType = {
  bookId: string;
};

type ResponseType = {
  message: string;
};

type BodyType = Record<string, never>;

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const deleteBook:HandlerType = async (req, res, next) => {
  try {
    const book = await repositorys.bookRepository.findOneBy({ id: Number(req.params.bookId) });
    if (!book) {
      throw customError(StatusCodes.NOT_FOUND, errorsMessage.BOOKS_NOT_FOUND);
    }
    await repositorys.bookRepository.remove(book);
    return res.json({ message: succsessMessage.BOOK_DELETED });
  } catch (err) {
    next(err);
  }
};
