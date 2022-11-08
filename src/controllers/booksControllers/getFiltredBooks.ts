import type { RequestHandler } from 'express';
// import { StatusCodes } from 'http-status-codes';
import { repositorys } from '../../db';
import type { Book } from '../../db/entitys/Book';
// import { customError } from '../../utils/error/customError';
// import { BOOKS_NOT_FOUND } from '../../utils/error/errorsText';

type QueryType = {
  genre?: string;
};

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type ResponseType = {
  books: Book[];
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const getFiltredBooks:HandlerType = async (req, res, next) => {
  try {
    const { genre } = req.query;
    // eslint-disable-next-line no-console
    console.log(genre);
    if (!genre.length) {
      const books = await repositorys.bookRepository
        .createQueryBuilder('book')
        .getMany();
      return res.json({ books });
    }
    const genreArr = genre.split(',');
    const books = await repositorys.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.genre', 'genre')
      .where('genre.name IN (:...genreArr)', { genreArr })
      .getMany();
    return res.json({ books });
  } catch (err) {
    next(err);
  }
};
