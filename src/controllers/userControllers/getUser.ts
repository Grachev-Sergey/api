import type { Handler } from 'express';
import * as jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { config } from '../../config';
import { repositorys } from '../../db';
import { customError } from '../../utils/error/customError';
import { USER_NOT_FOUND } from '../../utils/error/errorsText';

export const getUser:Handler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, config.token.secretKey) as { id: number };
    const user = await repositorys.userRepository.findOneBy({ id: payload.id });
    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, USER_NOT_FOUND);
    }

    const userId = user.id;

    const rating = await repositorys.ratingRepository
      .createQueryBuilder('rating')
      .where('rating.userId = :userId', { userId })
      .leftJoinAndSelect('rating.user', 'user')
      .getMany();

    if (rating) {
      const ratings = [];
      rating.forEach((item) => ratings.push(item.bookId));
      user.rating = ratings;
    }

    const favorite = await repositorys.favoriteRepository
      .createQueryBuilder('favorite')
      .where('favorite.userId = :userId', { userId })
      .leftJoinAndSelect('favorite.user', 'user')
      .getMany();

    if (favorite) {
      const favorites = [];
      favorite.forEach((item) => favorites.push(item.bookId));
      user.favorite = favorites;
    }

    const cart = await repositorys.cartRepository
      .createQueryBuilder('cart')
      .where('cart.userId = :userId', { userId })
      .leftJoinAndSelect('cart.user', 'user')
      .getMany();

    if (cart) {
      const booksInCart = [];
      cart.forEach((item) => booksInCart.push({ bookId: item.bookId, bookCover: item.bookCover }));
      user.cart = booksInCart;
    }

    return res.json({ user });
  } catch (err) {
    next(err);
  }
};
