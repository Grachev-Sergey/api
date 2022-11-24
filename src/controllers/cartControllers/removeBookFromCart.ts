import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { repositorys } from '../../db';
import { customError } from '../../utils/error/customError';
import { NOT_FOUND_ITEM_IN_CART } from '../../utils/error/errorsText';

export const removeBookFromCart:Handler = async (req, res, next) => {
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
