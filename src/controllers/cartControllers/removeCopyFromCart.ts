import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { repositorys } from '../../db';

import { customError } from '../../utils/createCustomError';
import errorsMessage from '../../utils/errorsMessage';

type ParamsType = {
  bookId: string;
};

type ResponseType = Record<string, never>;

type BodyType = Record<string, never>;

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const removeCopyFromCart:HandlerType = async (req, res, next) => {
  try {
    const id = Number(req.params.bookId);

    const foundCartElem = await repositorys.cartRepository
      .createQueryBuilder('cart')
      .where('cart.id = :id', { id })
      .getOne();

    if (!foundCartElem) {
      throw customError(StatusCodes.NOT_FOUND, errorsMessage.NOT_FOUND_ITEM_IN_CART);
    }

    foundCartElem.numberOfCopies -= 1;
    await repositorys.cartRepository.save(foundCartElem);
    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    next(err);
  }
};
