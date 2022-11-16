import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Comment } from '../../db/entitys/Comments';
import { repositorys } from '../../db';
import { customError } from '../../utils/error/customError';
import { BOOK_NOT_FOUND } from '../../utils/error/errorsText';

export const addComment:Handler = async (req, res, next) => {
  try {
    const { bookId, userId, commentText } = req.body;

    const book = await repositorys.bookRepository.findOneBy({ id: bookId });

    if (!book) {
      throw customError(StatusCodes.NOT_FOUND, BOOK_NOT_FOUND);
    }

    const comment = new Comment();
    comment.bookId = bookId;
    comment.userId = userId;
    comment.comment = commentText;

    await repositorys.commentRepository.save(comment);

    return res.json({ comment });
  } catch (err) {
    next(err);
  }
};
