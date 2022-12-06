import * as Yup from 'yup';

const addToCartSchema = Yup.object({
  bookId: Yup.string().required('Book id obligatory'),
});

export default {
  addToCartSchema,
};

export type CartSchemasType = typeof addToCartSchema;
