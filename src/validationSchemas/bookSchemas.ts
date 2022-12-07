import * as Yup from 'yup';

const addBookSchema = Yup.object({
  cover: Yup.string().required('Book cover obligatory'),
  title: Yup.string().required('Book title  obligatory'),
  author: Yup.string().required('Book author  obligatory'),
  description: Yup.string().max(1000).required('Description obligatory'),
  dateOfIssue: Yup.string().required('Date of issue obligatory'),
  genre: Yup.array(),
  hardCover: Yup.boolean().required('Indicate the presence of a hard cover'),
  hardCoverPrice: Yup.number(),
  paperback: Yup.boolean().required('Indicate the presence of a paperback'),
  paperbackPrice: Yup.number(),
  status: Yup.string(),
  rating: Yup.number(),
});

const deleteBookSchema = Yup.object({
  userId: Yup.string().required('User id obligatory'),
});

const getFiltredBooksSchema = Yup.object({
  genre: Yup.string(),
  minPrice: Yup.string().required('Indicate max price'),
  maxPrice: Yup.string().required('Indicate max price'),
  sorting: Yup.string().required('Indicate sorting type'),
  page: Yup.string().required('Indicate number of page'),
  search: Yup.string(),
});

const getOneBookSchema = Yup.object({
  bookId: Yup.string().required('Book id obligatory'),
});

const getRecommendedBooksSchema = Yup.object({
  id: Yup.string().required('Book id obligatory'),
});

const updateBookSchema = Yup.object({
  cover: Yup.string(),
  title: Yup.string(),
  author: Yup.string(),
  description: Yup.string(),
  dateOfIssue: Yup.string(),
  genre: Yup.array(),
  hardCover: Yup.boolean(),
  hardCoverPrice: Yup.number(),
  paperback: Yup.boolean(),
  paperbackPrice: Yup.number(),
  status: Yup.string(),
  rating: Yup.number(),
});

export default {
  addBookSchema,
  deleteBookSchema,
  getFiltredBooksSchema,
  getOneBookSchema,
  getRecommendedBooksSchema,
  updateBookSchema,
};

export type BookSchemaType = typeof addBookSchema | typeof deleteBookSchema |
typeof getFiltredBooksSchema | typeof getOneBookSchema | typeof getRecommendedBooksSchema |
typeof updateBookSchema;
