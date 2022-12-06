import authShema from './authShema';
import updateUserSchema from './updateUserSchema';
import bookSchemas from './bookSchemas';

import type { AuthShemaType } from './authShema';
import type { UpdateUserSchemaType } from './updateUserSchema';
import type { BookSchemaType } from './bookSchemas';

export default {
  authShema,
  updateUserSchema,
  bookSchemas,
};

export type SchemaType = AuthShemaType | UpdateUserSchemaType | BookSchemaType;
