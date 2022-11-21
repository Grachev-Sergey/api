import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { repositorys } from '../../db';
import { Cart } from '../../db/entitys/Cart';
import { customError } from '../../utils/error/customError';
import { BOOK_NOT_FOUND, USER_NOT_FOUND } from '../../utils/error/errorsText';

export const addToCart:Handler = async (req, res, next) => {
  try {
    const { userId, bookId, cover } = req.body;

    const book = await repositorys.bookRepository.findOneBy({ id: bookId });

    if (!book) {
      throw customError(StatusCodes.NOT_FOUND, BOOK_NOT_FOUND);
    }

    const user = await repositorys.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, USER_NOT_FOUND);
    }

    const cart = new Cart();
    cart.book = book;
    cart.user = user;
    cart.bookCover = cover;

    await repositorys.cartRepository.save(cart);

    return res.json({ isInCart: true });
  } catch (err) {
    next(err);
  }
};
