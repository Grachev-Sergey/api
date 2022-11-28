import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { Book } from '../../db/entitys/Book';
import type { Genre } from '../../db/entitys/Genre';
import { repositorys } from '../../db';
import { customError } from '../../utils/error/customError';
import { BOOK_NOT_FOUND } from '../../utils/error/errorsText';

type ParamsType = Record<string, never>;

type ResponseType = {
  book: Book;
  message: string;
};

type BodyType = {
  cover?: string;
  title?: string;
  author?: string;
  description?: string;
  dateOfIssue?: string;
  genre?: Genre[];
  hardCover?: boolean;
  hardCoverPrice?: number;
  paperback?: boolean;
  paperbackPrice?: number;
  status?: string;
  rating?: number;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const updateBook:HandlerType = async (req, res, next) => {
  try {
    const {
      cover,
      title,
      author,
      description,
      dateOfIssue,
      genre,
      hardCover,
      hardCoverPrice,
      paperback,
      paperbackPrice,
      status,
    } = req.body;

    const book = await repositorys.bookRepository.findOneBy({ id: Number(req.params.id) });
    if (!book) {
      throw customError(StatusCodes.BAD_REQUEST, BOOK_NOT_FOUND);
    }

    book.cover = cover;
    book.title = title;
    book.author = author;
    book.description = description;
    book.dateOfIssue = dateOfIssue;
    book.genre = genre;
    book.hardCover = hardCover;
    book.hardCoverPrice = hardCoverPrice;
    book.paperback = paperback;
    book.paperbackPrice = paperbackPrice;
    book.status = status;

    await repositorys.bookRepository.save(book);
    return res.json({ book, message: 'Book data updated successfully' });
  } catch (err) {
    next(err);
  }
};
