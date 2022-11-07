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
    book.hardCover = hardCover;
    book.hardCoverPrice = hardCoverPrice;
    book.paperback = paperback;
    book.paperbackPrice = paperbackPrice;
    book.status = status;

    const arr = [];
    for (let i = 0; genre.lenght; i++) {
      // eslint-disable-next-line no-console
      console.log(genre[i]);
      // eslint-disable-next-line no-await-in-loop
      const foundGenre = await repositorys.genreRepository.findOne({
        where: {
          name: genre[i],
        },
      });
      arr.push(foundGenre.name);
      // eslint-disable-next-line no-console
      console.log(arr);
    }
    book.genre = arr;

    // const arr = [];
    // const foundGenre = await repositorys.genreRepository.findOne({
    //   where: {
    //     name: genre[1],
    //   },
    // });
    // arr.push(foundGenre);
    // // eslint-disable-next-line no-console
    // console.log(arr);
    // book.genre = arr;

    await repositorys.bookRepository.save(book);
    return res.json({ message: config.apiMessage.BOOK_ADDED });
  } catch (err) {
    next(err);
  }
};
