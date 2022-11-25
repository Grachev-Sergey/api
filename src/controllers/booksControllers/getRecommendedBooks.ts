import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { repositorys } from '../../db';
import { customError } from '../../utils/error/customError';
import { BOOKS_NOT_FOUND } from '../../utils/error/errorsText';

export const getRecommendedBooks:Handler = async (req, res, next) => {
  try {
    const { id } = req.query;

    const books = await repositorys.bookRepository
      .createQueryBuilder('books')
      .getMany();
    if (!books) {
      throw customError(StatusCodes.NOT_FOUND, BOOKS_NOT_FOUND);
    }

    const recommended = books.filter((item) => item.id !== Number(id))
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    return res.json({ recommended });
  } catch (err) {
    next(err);
  }
};
