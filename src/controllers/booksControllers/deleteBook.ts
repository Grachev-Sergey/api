import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { config } from '../../config';
import { customError } from '../../utils/error/customError';
import { BOOK_NOT_FOUND } from '../../utils/error/errorsText';
import { repositorys } from '../../db';

type ParamsType = {
  id: string;
};

type ResponseType = {
  message: string;
};

type BodyType = Record<string, never>;

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const deleteBook:HandlerType = async (req, res, next) => {
  try {
    const book = await repositorys.bookRepository.findOneBy({ id: Number(req.params.id) });
    if (!book) {
      throw customError(StatusCodes.NOT_FOUND, BOOK_NOT_FOUND);
    }
    await repositorys.bookRepository.remove(book);
    return res.json({ message: config.apiMessage.BOOK_DELETED });
  } catch (err) {
    next(err);
  }
};
