import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { customError } from '../utils/error/customError';
import { INCORRECT_DATA } from '../utils/error/errorsText';
import { SchemaType } from '../schema/schemaType';

export const validationSchema = (schema: SchemaType):Handler => async (req, res, next) => {
  const body = req.body;
  try {
    await schema.validate(body);
    next();
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return next (
        customError(StatusCodes.BAD_REQUEST, INCORRECT_DATA)
      )
    }
    next(err);
  }
};