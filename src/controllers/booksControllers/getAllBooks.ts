import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { repositorys } from '../../db';
import type { Book } from '../../db/entitys/Book';
import { customError } from '../../utils/error/customError';
import { BOOKS_NOT_FOUND } from '../../utils/error/errorsText';

type ParamsType = Record<string, never>;

type ResponseType = {
  books: Book[];
};

type BodyType = Record<string, never>;

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const getAllBooks:HandlerType = async (req, res, next) => {
  try {
    const books = await repositorys.bookRepository
      .createQueryBuilder('book')
      .getMany();
    if (!books) {
      throw customError(StatusCodes.BAD_REQUEST, BOOKS_NOT_FOUND);
    }
    return res.json({ books });
  } catch (err) {
    next(err);
  }
};
