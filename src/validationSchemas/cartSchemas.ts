import * as Yup from 'yup';

const addToCartSchema = Yup.object({
  userId: Yup.number().required('User id obligatory'),
  bookId: Yup.number().required('Book id obligatory'),
  cover: Yup.string().required('Cover type obligatory'),
  price: Yup.number().required('Price obligatory'),
});

const getBooksFromCartSchema = Yup.object({
  userId: Yup.string().required('User id obligatory'),
});

const removeAllBooksFromCartSchema = Yup.object({
  userId: Yup.string().required('User id obligatory'),
});

const removeBookFromCartSchema = Yup.object({
  cartId: Yup.string().required('Cart id obligatory'),
});

const addCopyToCartSchema = Yup.object({
  bookId: Yup.string().required('Book id obligatory'),
});

const removeCopyFromCartSchema = Yup.object({
  bookId: Yup.string().required('Book id obligatory'),
});

export default {
  addToCartSchema,
  getBooksFromCartSchema,
  removeAllBooksFromCartSchema,
  removeBookFromCartSchema,
  addCopyToCartSchema,
  removeCopyFromCartSchema,
};

export type CartSchemasType = typeof addCopyToCartSchema | typeof addToCartSchema |
typeof getBooksFromCartSchema | typeof removeAllBooksFromCartSchema |
typeof removeBookFromCartSchema | typeof removeCopyFromCartSchema;
