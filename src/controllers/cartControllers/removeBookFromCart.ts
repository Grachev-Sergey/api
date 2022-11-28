import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { repositorys } from '../../db';
import { customError } from '../../utils/error/customError';
import { NOT_FOUND_ITEM_IN_CART } from '../../utils/error/errorsText';

type ParamsType = Record<string, never>;

type ResponseType = Record<string, never>;

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
      throw customError(StatusCodes.NOT_FOUND, NOT_FOUND_ITEM_IN_CART);
    }
    await repositorys.cartRepository.remove(foundInCart);
    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    next(err);
  }
};
