import * as Yup from 'yup';

const changeRatingSchema = Yup.object({
  userId: Yup.number().required('User id obligatory'),
  bookId: Yup.number().required('Book id obligatory'),
  rating: Yup.number().required('Rating required'),
});

export default {
  changeRatingSchema,
};

export type RatingSchemaType = typeof changeRatingSchema;
