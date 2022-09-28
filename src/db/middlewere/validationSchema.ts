import { Handler } from 'express'
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { customError } from '../../utils/error/customError';
import { INCORRECT_DATA } from '../../utils/error/errorsText';
import { SchemaType } from '../../utils/schema/schemaType';
import { responseError } from './responseError';


export const validationSchema = (schema: SchemaType):Handler => async (req, res, next) => {
  const body = req.body;
  try {
    await schema.validate(body);
    next();
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(StatusCodes.BAD_REQUEST).json(INCORRECT_DATA);
    }
  }
};