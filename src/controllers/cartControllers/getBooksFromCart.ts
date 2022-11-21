import type { Handler } from 'express';
import { repositorys } from '../../db';
import { config } from '../../config';
// import { StatusCodes } from 'http-status-codes';
// import { customError } from '../../utils/error/customError';
// import { BOOK_NOT_FOUND_IN_FAVORITES } from '../../utils/error/errorsText';

export const getBooksFromCart:Handler = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const cartArray = await repositorys.cartRepository
      .createQueryBuilder('cart')
      .where('cart.userId = :userId', { userId })
      .getMany();

    const booksInCart = [];
    cartArray.forEach((item) => {
      booksInCart.push({
        bookId: item.book.id,
        bookCover: `http://localhost:${config.serverPort}/booksCover/${item.book.cover}`,
        bookTitle: item.book.title,
        bookAuthor: item.book.author,
        bookPrice: 
      })
    })

    return res.json({ cart });
  } catch (err) {
    next(err);
  }
};
