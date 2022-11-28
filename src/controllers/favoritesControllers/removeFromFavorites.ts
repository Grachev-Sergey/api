import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { repositorys } from '../../db';
import { customError } from '../../utils/error/customError';
import { BOOK_NOT_FOUND_IN_FAVORITES } from '../../utils/error/errorsText';

type ParamsType = Record<string, never>;

type ResponseType = Record<string, never>;

type BodyType = Record<string, never>;

type QueryType = {
  userId: number;
  bookId: number;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const removeFromFavorites:HandlerType = async (req, res, next) => {
  try {
    const { userId, bookId } = req.query;

    const foundInFavorites = await repositorys.favoriteRepository
      .createQueryBuilder('favorite')
      .where('favorite.userId = :userId AND favorite.bookId = :bookId', { userId, bookId })
      .getOne();

    if (!foundInFavorites) {
      throw customError(StatusCodes.NOT_FOUND, BOOK_NOT_FOUND_IN_FAVORITES);
    }
    await repositorys.favoriteRepository.remove(foundInFavorites);
    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    next(err);
  }
};
