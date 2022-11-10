import type { RequestHandler } from 'express';
import { repositorys } from '../../db';
import type { Book } from '../../db/entitys/Book';

type QueryType = {
  genre?: string;
  minPrice?: number;
  maxPrice?: number;
  sorting?: string;
};

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type ResponseType = {
  books: Book[];
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const getFiltredBooks:HandlerType = async (req, res, next) => {
  try {
    const { genre, minPrice, maxPrice, sorting } = req.query;

    let sortBy: string;
    if (sorting === 'price') {
      sortBy = 'hardCoverPrice';
    } else if (sorting === 'name') {
      sortBy = 'title';
    } else if (sorting === 'author name') {
      sortBy = 'author';
    } else if (sorting === 'date of issue') {
      sortBy = 'dateOfIssue';
    } else {
      sortBy = sorting;
    }

    if (!genre.length) {
      const books = await repositorys.bookRepository
        .createQueryBuilder('book')
        .andWhere('book.hardCoverPrice BETWEEN :minPrice AND :maxPrice', { minPrice, maxPrice })
        .orderBy(`book.${sortBy}`, 'ASC')
        .getMany();
      return res.json({ books });
    }
    const genreArr = genre.split(',');
    const books = await repositorys.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.genre', 'genre')
      .where('genre.name IN (:...genreArr)', { genreArr })
      .andWhere('book.hardCoverPrice BETWEEN :minPrice AND :maxPrice', { minPrice, maxPrice })
      .orderBy(`book.${sortBy}`, 'ASC')
      .getMany();
    return res.json({ books });
  } catch (err) {
    next(err);
  }
};
