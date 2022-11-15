import type { Handler } from 'express';
import { repositorys } from '../../db';
import { Favorite } from '../../db/entitys/Favorite';

export const removeFromFavorites:Handler = async (req, res, next) => {
  try {
    const { userId, bookId } = req.body;

    await repositorys.favoriteRepository
      .createQueryBuilder()
      .delete()
      .from(Favorite)
      .where('userId = :userId', { userId })
      .andWhere('bookId = :bookId', { bookId })
      .execute();

    return res.json({ isInFavorite: false });
  } catch (err) {
    next(err);
  }
};
