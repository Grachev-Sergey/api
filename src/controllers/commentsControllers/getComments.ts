import type { Handler } from 'express';
import { repositorys } from '../../db';

export const getComments:Handler = async (req, res, next) => {
  try {
    const bookId = req.params.id;

    const comments = await repositorys.commentRepository
      .createQueryBuilder('comment')
      .where('comment.bookId = :bookId', { bookId })
      .getMany();
    return res.json({ comments });
  } catch (err) {
    next(err);
  }
};
