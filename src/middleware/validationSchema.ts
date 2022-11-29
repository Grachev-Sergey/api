import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { customError } from '../utils/customError';
import errorMessage from '../utils/errorsMessage';
import type { SchemaType } from '../schema/schemaType';

export const validationSchema = (schema: SchemaType): Handler => async (req, res, next) => {
  const body = req.body;
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
