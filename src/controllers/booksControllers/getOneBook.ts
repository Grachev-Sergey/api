import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { repositorys } from '../../db';
import { customError } from '../../utils/error/customError';
import { BOOK_NOT_FOUND } from '../../utils/error/errorsText';

export const getOneBook:Handler = async (req, res, next) => {
  try {
    const bookId = Number(req.params.id);
    const book = await repositorys.bookRepository.findOneBy({ id: bookId });
    if (!book) {
      throw customError(StatusCodes.NOT_FOUND, BOOK_NOT_FOUND);
    }
    const comments = await repositorys.commentRepository
      .createQueryBuilder('comment')
      .where('comment.bookId = :bookId', { bookId })
      .leftJoinAndSelect('comment.user', 'user')
      .getMany();

    return res.json({ book, comments });
  } catch (err) {
    next(err);
  }
};
