import type { Handler } from 'express';
import { repositorys } from '../../db';

export const changeRating:Handler = async (req, res, next) => {
  try {
    const { bookId, userId, rating } = req.body;

    // const allBookRating = repositorys.ratingRepository.createQueryBuilder('rating')
    //   .where('rating.bookId :bookId', { bookId })
    //   .getMany();
    const book = repositorys.bookRepository.findOneBy({ id: bookId });
    // eslint-disable-next-line no-console
    console.log((await book).rating, userId, rating);
  } catch (err) {
    next(err);
  }
};
