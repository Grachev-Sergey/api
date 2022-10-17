import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { repositorys } from '../../db';
import { customError } from '../../utils/error/customError';

export const getAllBooks:Handler = async (req, res, next) => {
  try {
    const books = await repositorys.bookRepository.find();
    if (!books) {
      throw customError(StatusCodes.BAD_REQUEST, 'no books');
    }
    return res.json({ books });
  } catch (err) {
    next(err);
  }
};
