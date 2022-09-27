import { Handler } from 'express'
import { StatusCodes } from 'http-status-codes';
import { customError } from '../../utils/error/customError';
import { INCORRECT_DATA } from '../../utils/error/errorsText';
import { SchemaType } from '../../utils/schema/schemaType';
import { responseError } from './responseError';


export const validationSchema = (schema: SchemaType):Handler => async (req, res, next) => {
  const body = req.body;
  try {
    const valide = await schema.validate(body);
    if(!valide) {
      throw customError(StatusCodes.BAD_REQUEST, INCORRECT_DATA);
    }
    next();
  } catch (err) {
    responseError(err, req, res, next);
  }
};