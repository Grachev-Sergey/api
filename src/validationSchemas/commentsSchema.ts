import * as Yup from 'yup';

const addCommentSchema = Yup.object({
  userId: Yup.number().required('User id obligatory'),
  bookId: Yup.number().required('Book id obligatory'),
  commentText: Yup.string().required('Comment text is required'),
});

export default {
  addCommentSchema,
};

export type CommentSchemaType = typeof addCommentSchema;
