import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { repositorys } from '../../db';
import { customError } from '../../utils/error/customError';
import { CART_IS_EMPTY } from '../../utils/error/errorsText';

export const removeAllBooksFromCart:Handler = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const foundCart = await repositorys.cartRepository
      .createQueryBuilder('cart')
      .where('cart.userId = :userId', { userId })
      .getMany();

    if (!foundCart) {
      throw customError(StatusCodes.NOT_FOUND, CART_IS_EMPTY);
    }
    await repositorys.cartRepository.remove(foundCart);
    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    next(err);
  }
};
