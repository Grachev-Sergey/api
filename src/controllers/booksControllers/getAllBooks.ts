import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { repositorys } from '../../db';
import { customError } from '../../utils/error/customError';
import { BOOKS_NOT_FOUND } from '../../utils/error/errorsText';

export const getAllBooks:Handler = async (req, res, next) => {
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
