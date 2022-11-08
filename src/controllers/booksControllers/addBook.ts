import type { Handler } from 'express';
import { Any } from 'typeorm';

import { repositorys } from '../../db';
import { config } from '../../config';
import { Book } from '../../db/entitys/Book';

export const addBook: Handler = async (req, res, next) => {
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
    book.hardCover = hardCover;
    book.hardCoverPrice = hardCoverPrice;
    book.paperback = paperback;
    book.paperbackPrice = paperbackPrice;
    book.status = status;

    const arr = [];
    const foundGenre = await repositorys.genreRepository.find({
      where: {
        name: Any(genre),
      },
    });
    arr.push(...foundGenre);
    book.genre = arr;

    await repositorys.bookRepository.save(book);
    return res.json({ message: config.apiMessage.BOOK_ADDED });
  } catch (err) {
    next(err);
  }
};
