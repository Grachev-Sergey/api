import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { repositorys } from '../../db';
import { Favorite } from '../../db/entitys/Favorite';
import { customError } from '../../utils/error/customError';
import { BOOK_NOT_FOUND, USER_NOT_FOUND } from '../../utils/error/errorsText';

export const addToFavorites:Handler = async (req, res, next) => {
  try {
    const { userId, bookId } = req.body;

    const book = await repositorys.bookRepository.findOneBy({ id: bookId });

    if (!book) {
      throw customError(StatusCodes.NOT_FOUND, BOOK_NOT_FOUND);
    }

    const user = await repositorys.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, USER_NOT_FOUND);
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
