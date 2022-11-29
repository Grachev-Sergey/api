import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { repositorys } from '../../db';
import type { Book } from '../../db/entitys/Book';
import { customError } from '../../utils/customError';
import errorsMessage from '../../utils/errorsMessage';

type ParamsType = Record<string, never>;

type ResponseType = {
  recommended: Book[];
};

type BodyType = Record<string, never>;

type QueryType = {
  id: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const getRecommendedBooks:HandlerType = async (req, res, next) => {
  try {
    const { id } = req.query;

    const books = await repositorys.bookRepository
      .createQueryBuilder('books')
      .getMany();
    if (!books) {
      throw customError(StatusCodes.NOT_FOUND, errorsMessage.BOOKS_NOT_FOUND);
    }

    const recommended = books.filter((item) => item.id !== Number(id))
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    return res.json({ recommended });
  } catch (err) {
    next(err);
  }
};
