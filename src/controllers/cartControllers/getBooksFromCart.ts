import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { repositorys } from '../../db';
import { customError } from '../../utils/error/customError';
import { CART_IS_EMPTY } from '../../utils/error/errorsText';

export const getBooksFromCart:Handler = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const cartArray = await repositorys.cartRepository
      .createQueryBuilder('cart')
      .where('cart.userId = :userId', { userId })
      .leftJoinAndSelect('cart.book', 'book')
      .getMany();

    if (!cartArray) {
      throw customError(StatusCodes.NOT_FOUND, CART_IS_EMPTY);
    }

    const booksInCart = [];
    cartArray.forEach((item) => {
      booksInCart.push({
        bookId: item.book.id,
        bookCover: item.book.cover,
        bookTitle: item.book.title,
        bookAuthor: item.book.author,
        bookPrice: item.price,
        coverType: item.bookCover,
      });
    });

    const cart = booksInCart;
    return res.json({ cart });
  } catch (err) {
    next(err);
  }
};
