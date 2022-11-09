import type { RequestHandler } from 'express';
import { repositorys } from '../../db';
import type { Book } from '../../db/entitys/Book';

type QueryType = {
  genre?: string;
  minPrice?: string;
  maxPrice?: string;
};

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type ResponseType = {
  books: Book[];
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const getFiltredBooks:HandlerType = async (req, res, next) => {
  try {
    const { genre, minPrice, maxPrice } = req.query;
    if (!genre.length) {
      const books = await repositorys.bookRepository
        .createQueryBuilder('book')
        .andWhere('book.hardCoverPrice BETWEEN :minPrice AND :maxPrice', { minPrice, maxPrice })
        .getMany();
      return res.json({ books });
    }
    const genreArr = genre.split(',');
    // eslint-disable-next-line no-console
    console.log(maxPrice, minPrice);
    const books = await repositorys.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.genre', 'genre')
      .where('genre.name IN (:...genreArr)', { genreArr })
      .andWhere('book.hardCoverPrice BETWEEN :minPrice AND :maxPrice', { minPrice, maxPrice })
      .getMany();
    return res.json({ books });
  } catch (err) {
    next(err);
  }
};
