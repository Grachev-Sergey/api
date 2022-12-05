import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { repositorys } from '../../db';
import { Cart } from '../../db/entities/Cart';

import { customError } from '../../utils/createCustomError';
import errorsMessage from '../../utils/errorsMessage';

type ParamsType = Record<string, never>;

type ResponseType = {
  id: number;
  bookCover: string;
  bookId: number;
  price: number;
  userId: number;
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

    const newCartItem = {
      id: cart.id,
      bookCover: cart.bookCover,
      bookId: cart.bookId,
      price: cart.price,
      userId: cart.userId,
    };

    return res.json(newCartItem);
  } catch (err) {
    next(err);
  }
};
