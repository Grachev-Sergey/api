import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { repositorys } from '../../db';

import { customError } from '../../utils/createCustomError';
import errorsMessage from '../../utils/errorsMessage';

type ParamsType = Record<string, never>;

type ResponseType = Record<string, never>;

type BodyType = Record<string, never>;

type QueryType = {
  userId: number;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const removeAllBooksFromCart:HandlerType = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const foundCart = await repositorys.cartRepository
      .createQueryBuilder('cart')
      .where('cart.userId = :userId', { userId })
      .getMany();

    if (!foundCart) {
      throw customError(StatusCodes.NOT_FOUND, errorsMessage.CART_IS_EMPTY);
    }
    await repositorys.cartRepository.remove(foundCart);
    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    next(err);
  }
};
