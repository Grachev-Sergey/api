import type { RequestHandler } from 'express';

import { repositorys } from '../../db';
import type { Book } from '../../db/entities/Book';

type ParamsType = Record<string, never>;

type ResponseType = {
  books: Book[];
  counter: number;
  numberPerPage: number;
};

type BodyType = Record<string, never>;

type QueryType = {
  genre?: string;
  minPrice?: string;
  maxPrice?: string;
  sorting?: string;
  page?: string;
  search?: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const getFiltredBooks: HandlerType = async (req, res, next) => {
  try {
    const { genre, sorting } = req.query;
    const minPrice = Number(req.query.minPrice);
    const maxPrice = Number(req.query.maxPrice);
    const page = Number(req.query.page);
    const search = `%${req.query.search}%`;
    const numberPerPage = 12;

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

    const filtredBooks = repositorys.bookRepository.createQueryBuilder('book')
      .where('book.hardCoverPrice BETWEEN :minPrice AND :maxPrice', { minPrice, maxPrice })
      .orderBy(`book.${sortBy}`, 'ASC');

    if (genre.length) {
      const genreArr = genre.split(',');
      filtredBooks.innerJoinAndSelect('book.genre', 'genre', 'genre.name IN (:...genreArr)', { genreArr });
    }

    if (req.query.search) {
      filtredBooks.andWhere('book.title ILIKE :search OR book.author ILIKE :search', { search });
    }

    const counter = (await filtredBooks.getMany()).length;
    const books = await filtredBooks
      .take(numberPerPage)
      .skip((+page - 1) * numberPerPage)
      .getMany();
    return res.json({ books, counter, numberPerPage });
  } catch (err) {
    next(err);
  }
};
