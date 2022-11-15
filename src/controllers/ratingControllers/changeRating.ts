import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { repositorys } from '../../db';
import { Rating } from '../../db/entitys/Rating';
import { customError } from '../../utils/error/customError';
import { BOOK_NOT_FOUND } from '../../utils/error/errorsText';

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

export const changeRating:Handler = async (req, res, next) => {
  try {
    const { bookId, userId, rating } = req.body;

    const book = await repositorys.bookRepository.findOneBy({ id: bookId });

    if (!book) {
      throw customError(StatusCodes.NOT_FOUND, BOOK_NOT_FOUND);
    }

    const allRateing = await repositorys.ratingRepository.createQueryBuilder('rating')
      .where('rating.userId = :userId AND rating.bookId = :bookId', { userId, bookId })
      .getOne();

    if (allRateing) {
      allRateing.rating = rating;

      await repositorys.ratingRepository.save(allRateing);

      const resultRating = await changeBookRating(bookId);

      book.rating = resultRating;

      await repositorys.bookRepository.save(book);

      return res.json({ rating: book.rating });
    }

    const newRating = new Rating();
    newRating.userId = userId;
    newRating.bookId = bookId;
    newRating.rating = rating;

    await repositorys.ratingRepository.save(newRating);

    const resultRating = await changeBookRating(bookId);

    book.rating = resultRating;

    await repositorys.bookRepository.save(book);

    return res.json({ rating: book.rating });
  } catch (err) {
    next(err);
  }
};
