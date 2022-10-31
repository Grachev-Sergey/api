import type { Handler } from 'express';
import { repositorys } from '../../db';
import { config } from '../../config';
import { Book } from '../../db/entitys/Book';

export const addBook:Handler = async (req, res, next) => {
  try {
    const {
      cover,
      title,
      author,
      description,
      dateOfIssue,
      genre,
      hardCover,
      hardCoverPrice,
      paperback,
      paperbackPrice,
      status,
    } = req.body;

    const book = new Book();
    book.cover = cover;
    book.title = title;
    book.author = author;
    book.description = description;
    book.dateOfIssue = dateOfIssue;
    book.genre = genre;
    book.hardCover = hardCover;
    book.hardCoverPrice = hardCoverPrice;
    book.paperback = paperback;
    book.paperbackPrice = paperbackPrice;
    book.status = status;

    await repositorys.bookRepository.save(book);
    return res.json({ message: config.apiMessage.BOOK_ADDED });
  } catch (err) {
    next(err);
  }
};
