import authShemas from './authSchemas';
import updateUserSchema from './updateUserSchema';
import bookSchemas from './bookSchemas';
import cartSchemas from './cartSchemas';
import commentsSchema from './commentsSchema';
import favoritesSchemas from './favoritesSchemas';
import genreSchemas from './genreSchemas';
import ratingSchemas from './ratingSchemas';

import type { AuthSchemasType } from './authSchemas';
import type { UpdateUserSchemaType } from './updateUserSchema';
import type { BookSchemaType } from './bookSchemas';
import type { CartSchemasType } from './cartSchemas';
import type { CommentSchemaType } from './commentsSchema';
import type { FavoritesSchemaType } from './favoritesSchemas';
import type { GenreSchemaType } from './genreSchemas';
import type { RatingSchemaType } from './ratingSchemas';

export default {
  authShemas,
  updateUserSchema,
  bookSchemas,
  cartSchemas,
  commentsSchema,
  favoritesSchemas,
  genreSchemas,
  ratingSchemas,
};

export type SchemaType = AuthSchemasType | UpdateUserSchemaType | BookSchemaType | CartSchemasType |
CommentSchemaType | FavoritesSchemaType | GenreSchemaType | RatingSchemaType;
