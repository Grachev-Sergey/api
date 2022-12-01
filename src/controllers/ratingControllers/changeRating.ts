import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { repositorys } from '../../db';
import { Rating } from '../../db/entitys/Rating';

import { customError } from '../../utils/customError';
import errorsMessage from '../../utils/errorsMessage';

type ParamsType = Record<string, never>;

type ResponseType = {
  id: number;
  bookId: number;
  userId: number;
  rating: number;
};

type BodyType = {
  bookId: number;
  userId: number;
  rating: number;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

const changeBookRating = async (bookId: number) => {
  const bookRating = await repositorys.ratingRepository.createQueryBuilder('rating')
    .where('rating.bookId = :bookId', { bookId })
    .getMany();
  let sumRating = 0;

  bookRating.forEach((item) => {
    sumRating += item.rating;
  });

  return Number((sumRating / bookRating.length).toFixed(1));
};

export const changeRating:HandlerType = async (req, res, next) => {
  try {
    const { bookId, userId, rating } = req.body;

    const book = await repositorys.bookRepository.findOneBy({ id: bookId });

    if (!book) {
      throw customError(StatusCodes.NOT_FOUND, errorsMessage.BOOK_NOT_FOUND);
    }

    const ratedItem = await repositorys.ratingRepository.createQueryBuilder('rating')
      .where('rating.userId = :userId AND rating.bookId = :bookId', { userId, bookId })
      .getOne();

    if (ratedItem) {
      ratedItem.rating = rating;

      await repositorys.ratingRepository.save(ratedItem);

      const resultRating = await changeBookRating(bookId);

      book.rating = resultRating;

      await repositorys.bookRepository.save(book);

      return res.json(ratedItem);
    }

    const newRating = new Rating();
    newRating.userId = userId;
    newRating.bookId = bookId;
    newRating.rating = rating;

    await repositorys.ratingRepository.save(newRating);

    const resultRating = await changeBookRating(bookId);

    book.rating = resultRating;

    await repositorys.bookRepository.save(book);

    return res.json(newRating);
  } catch (err) {
    next(err);
  }
};
