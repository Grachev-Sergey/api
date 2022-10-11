import type { authorizationSchema } from './authorizationSchema';
import type { updateUserInfoSchema } from './updateUserInfoSchema';
import type { updateUserPassSchema } from './updateUserPassSchema';

export type AuthSchemaType = typeof authorizationSchema;
export type UpdateUserInfoType = typeof updateUserInfoSchema;
export type UpdateUserPassType = typeof updateUserPassSchema;

export type SchemaType = AuthSchemaType | UpdateUserInfoType | UpdateUserPassType;
