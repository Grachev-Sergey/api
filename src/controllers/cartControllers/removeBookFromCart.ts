import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { repositorys } from '../../db';
import { customError } from '../../utils/error/customError';
import { BOOK_NOT_FOUND_IN_FAVORITES } from '../../utils/error/errorsText';

export const removeBookFromCart:Handler = async (req, res, next) => {
  try {
    const { userId, bookId } = req.query;

    const foundInCart = await repositorys.cartRepository
      .createQueryBuilder('cart')
      .where('cart.userId = :userId AND cart.bookId = :bookId', { userId, bookId })
      .getOne();

    if (!foundInCart) {
      throw customError(StatusCodes.NOT_FOUND, BOOK_NOT_FOUND_IN_FAVORITES);
    }
    await repositorys.favoriteRepository.remove(foundInCart);
    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    next(err);
  }
};
