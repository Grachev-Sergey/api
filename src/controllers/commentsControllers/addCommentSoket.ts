import { Comment } from '../../db/entities/Comments';
import { repositorys } from '../../db';

export type CommentDataType = {
  bookId?: number;
  userId?: number;
  commentText?: string;
};

export const addCommentSoket = async (data: CommentDataType) => {
  try {
    const { bookId, userId, commentText } = data;

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

    return replyWithComment;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};
