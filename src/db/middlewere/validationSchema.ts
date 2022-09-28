import { Handler } from 'express'
import { SchemaType } from '../../utils/schema/schemaType';
import { responseError } from './responseError';


export const validationSchema = (schema: SchemaType):Handler => async (req, res, next) => {
  const body = req.body;
  try {
    await schema.validate(body);
    next();
  } catch (err) {
    responseError(err, req, res, next);
  }
};