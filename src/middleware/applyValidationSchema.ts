import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { customError } from '../utils/createCustomError';
import errorMessage from '../utils/errorsMessage';
import type { signInSchema } from '../validationSchemas/signInSchema';
import type { updateUserInfoSchema } from '../validationSchemas/updateUserInfoSchema';
import type { updateUserPassSchema } from '../validationSchemas/updateUserPassSchema';

export type AuthSchemaType = typeof signInSchema;
export type UpdateUserInfoType = typeof updateUserInfoSchema;
export type UpdateUserPassType = typeof updateUserPassSchema;

type SchemaType = AuthSchemaType | UpdateUserInfoType | UpdateUserPassType;

export const applyValidationSchema = (schema: SchemaType): Handler => async (req, res, next) => {
  const { query, params, body } = req;

  // eslint-disable-next-line no-console
  console.log(query, params);

  if (query || params) {
    throw customError(StatusCodes.BAD_REQUEST, errorMessage.INCORRECT_DATA);
  }

  try {
    await schema.validate(body);
    next();
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return next(
        customError(StatusCodes.BAD_REQUEST, errorMessage.INCORRECT_DATA),
      );
    }
    next(err);
  }
};
