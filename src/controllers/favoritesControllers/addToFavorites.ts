import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { repositorys } from '../../db';
import { Favorite } from '../../db/entities/Favorite';

import { customError } from '../../utils/createCustomError';
import errorsMessage from '../../utils/errorsMessage';

type ParamsType = Record<string, never>;

type ResponseType = {
  id: number;
  bookId: number;
  userId: number;
};

type BodyType = {
  userId: number;
  bookId: number;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const addToFavorites:HandlerType = async (req, res, next) => {
  try {
    const { userId, bookId } = req.body;

    const book = await repositorys.bookRepository.findOneBy({ id: bookId });

    if (!book) {
      throw customError(StatusCodes.NOT_FOUND, errorsMessage.BOOK_NOT_FOUND);
    }

    const user = await repositorys.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, errorsMessage.USER_NOT_FOUND);
    }

    const favorite = new Favorite();
    favorite.book = book;
    favorite.user = user;

    await repositorys.favoriteRepository.save(favorite);

    const favoriteItem = {
      id: favorite.id,
      bookId: favorite.bookId,
      userId: favorite.userId,
    };

    return res.json(favoriteItem);
  } catch (err) {
    next(err);
  }
};
