import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { repositorys } from '../../db';
import { customError } from '../../utils/error/customError';
import { BOOK_NOT_FOUND } from '../../utils/error/errorsText';

export const getOneBook: Handler = async (req, res, next) => {
  try {
    const bookId = Number(req.params.id);

    const book = await repositorys.bookRepository
      .createQueryBuilder('book')
      .where('book.id = :bookId', { bookId })
      .leftJoinAndSelect('book.comments', 'comments')
      .leftJoinAndSelect('comments.user', 'user')
      .getOne();

    if (!book) {
      throw customError(StatusCodes.NOT_FOUND, BOOK_NOT_FOUND);
    }

    return res.json({ book });
  } catch (err) {
    next(err);
  }
};
