import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { repositorys } from '../../db';

import { customError } from '../../utils/createCustomError';
import errorsMessage from '../../utils/errorsMessage';

type ParamsType = Record<string, never>;

type ResponseType = {
  id: number;
};

type BodyType = Record<string, never>;

type QueryType = {
  cartId: number;
};

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const removeBookFromCart:HandlerType = async (req, res, next) => {
  try {
    const { cartId } = req.query;

    const foundInCart = await repositorys.cartRepository
      .createQueryBuilder('cart')
      .where('cart.id = :cartId', { cartId })
      .getOne();

    if (!foundInCart) {
      throw customError(StatusCodes.NOT_FOUND, errorsMessage.NOT_FOUND_ITEM_IN_CART);
    }
    const id = foundInCart.id;
    await repositorys.cartRepository.remove(foundInCart);
    return res.json({ id });
  } catch (err) {
    next(err);
  }
};
