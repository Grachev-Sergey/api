import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { Favorite } from '../../db/entitys/Favorite';
import { repositorys } from '../../db';
import { customError } from '../../utils/error/customError';
import { BOOKS_NOT_FOUND } from '../../utils/error/errorsText';

type ParamsType = Record<string, never>;

type ResponseType = Favorite[];

type BodyType = Record<string, never>;

type QueryType = {
  userId: number;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const getFavorites:HandlerType = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const favoriteBooks = await repositorys.favoriteRepository
      .createQueryBuilder('favorite')
      .where('favorite.userId = :userId', { userId })
      .leftJoinAndSelect('favorite.book', 'book')
      .getMany();

    if (!favoriteBooks) {
      throw customError(StatusCodes.NOT_FOUND, BOOKS_NOT_FOUND);
    }
    return res.json(favoriteBooks);
  } catch (err) {
    next(err);
  }
};
