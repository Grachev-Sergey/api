import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { repositorys } from '../../db';
import { Cart } from '../../db/entitys/Cart';
import { customError } from '../../utils/customError';
import errorsMessage from '../../utils/errorsMessage';

type ParamsType = Record<string, never>;

type ResponseType = {
  isInCart: boolean;
};

type BodyType = {
  userId: number;
  bookId: number;
  cover: string;
  price: number;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const addToCart:HandlerType = async (req, res, next) => {
  try {
    const { userId, bookId, cover, price } = req.body;

    const book = await repositorys.bookRepository.findOneBy({ id: bookId });

    if (!book) {
      throw customError(StatusCodes.NOT_FOUND, errorsMessage.BOOK_NOT_FOUND);
    }

    const user = await repositorys.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, errorsMessage.USER_NOT_FOUND);
    }

    const cart = new Cart();
    cart.book = book;
    cart.user = user;
    cart.bookCover = cover;
    cart.price = price;

    await repositorys.cartRepository.save(cart);

    return res.json({ isInCart: true });
  } catch (err) {
    next(err);
  }
};
