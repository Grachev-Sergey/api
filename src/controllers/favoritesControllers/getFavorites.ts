import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import type { Favorite } from '../../db/entities/Favorite';
import { repositorys } from '../../db';

import { customError } from '../../utils/createCustomError';
import errorsMessage from '../../utils/errorsMessage';

type ParamsType = Record<string, never>;

type ResponseType = Favorite[];

type BodyType = Record<string, never>;

type QueryType = {
  userId: string;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const getFavorites:HandlerType = async (req, res, next) => {
  try {
    const userId = Number(req.query.userId);

    const favoriteBooks = await repositorys.favoriteRepository
      .createQueryBuilder('favorite')
      .where('favorite.userId = :userId', { userId })
      .leftJoinAndSelect('favorite.book', 'book')
      .getMany();

    if (!favoriteBooks) {
      throw customError(StatusCodes.NOT_FOUND, errorsMessage.BOOKS_NOT_FOUND);
    }
    return res.json(favoriteBooks);
  } catch (err) {
    next(err);
  }
};
