import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { Cart } from '../../db/entitys/Cart';
import { repositorys } from '../../db';
import { customError } from '../../utils/error/customError';
import { CART_IS_EMPTY } from '../../utils/error/errorsText';

type ParamsType = Record<string, never>;

type ResponseType = {
  cart: Cart[];
};

type BodyType = Record<string, never>;

type QueryType = {
  userId: number;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const getBooksFromCart:HandlerType = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const cart = await repositorys.cartRepository
      .createQueryBuilder('cart')
      .where('cart.userId = :userId', { userId })
      .leftJoinAndSelect('cart.book', 'book')
      .getMany();

    if (!cart) {
      throw customError(StatusCodes.NOT_FOUND, CART_IS_EMPTY);
    }

    return res.json({ cart });
  } catch (err) {
    next(err);
  }
};
