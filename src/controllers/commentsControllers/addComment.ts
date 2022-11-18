import type { Handler } from 'express';

import { Comment } from '../../db/entitys/Comments';
import { repositorys } from '../../db';

export const addComment:Handler = async (req, res, next) => {
  try {
    const { bookId, userId, commentText } = req.body;

    const comment = new Comment();
    comment.bookId = bookId;
    comment.userId = userId;
    comment.comment = commentText;

    await repositorys.commentRepository.save(comment);

    const id = comment.id;

    const replyWithComment = await repositorys.commentRepository
      .createQueryBuilder('comment')
      .where('comment.id = :id', { id })
      .leftJoinAndSelect('comment.user', 'user')
      .getOne();

    return res.json(replyWithComment);
  } catch (err) {
    next(err);
  }
};
