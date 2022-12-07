import * as Yup from 'yup';

const addToFavoritesSchema = Yup.object({
  userId: Yup.number().required('User id obligatory'),
  bookId: Yup.number().required('Book id obligatory'),
});

const getFavoritesSchema = Yup.object({
  userId: Yup.string().required('User id obligatory'),
});

const removeFromFavoritesSchema = Yup.object({
  userId: Yup.string().required('User id obligatory'),
  bookId: Yup.string().required('Book id obligatory'),
});

export default {
  addToFavoritesSchema,
  getFavoritesSchema,
  removeFromFavoritesSchema,
};

export type FavoritesSchemaType = typeof addToFavoritesSchema | typeof getFavoritesSchema |
typeof removeFromFavoritesSchema;
