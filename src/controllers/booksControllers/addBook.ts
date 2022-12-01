import type { RequestHandler } from 'express';
import { Any } from 'typeorm';

import { repositorys } from '../../db';
import { Book } from '../../db/entitys/Book';

import succsessMessage from '../../utils/succsessMessage';

type ParamsType = Record<string, never>;

type ResponseType = {
  message: string;
};

type BodyType = {
  cover: string;
  title: string;
  author: string;
  description: string;
  dateOfIssue: string;
  genre: string[];
  hardCover: boolean;
  hardCoverPrice: number;
  paperback: boolean;
  paperbackPrice: number;
  status: string;
  rating: number;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const addBook: HandlerType = async (req, res, next) => {
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
      rating,
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
    book.rating = rating;

    const arr = [];
    const foundGenre = await repositorys.genreRepository.find({
      where: {
        name: Any(genre),
      },
    });
    arr.push(...foundGenre);
    book.genre = arr;

    await repositorys.bookRepository.save(book);
    return res.json({ message: succsessMessage.BOOK_ADDED });
  } catch (err) {
    next(err);
  }
};
