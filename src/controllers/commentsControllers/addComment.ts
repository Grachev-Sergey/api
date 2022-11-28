import type { RequestHandler } from 'express';

import { Comment } from '../../db/entitys/Comments';
import { repositorys } from '../../db';

type ParamsType = Record<string, never>;

type ResponseType = Comment;

type BodyType = {
  bookId: number;
  userId: number;
  commentText: string;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const addComment:HandlerType = async (req, res, next) => {
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
