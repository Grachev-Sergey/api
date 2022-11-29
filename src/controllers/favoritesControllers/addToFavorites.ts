import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { repositorys } from '../../db';
import { Favorite } from '../../db/entitys/Favorite';
import { customError } from '../../utils/customError';
import errorsMessage from '../../utils/errorsMessage';

type ParamsType = Record<string, never>;

type ResponseType = {
  isInFavorite: boolean;
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

    return res.json({ isInFavorite: true });
  } catch (err) {
    next(err);
  }
};
