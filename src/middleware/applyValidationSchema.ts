import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import type { SchemaType } from '../validationSchemas';

import { customError } from '../utils/createCustomError';
import errorMessage from '../utils/errorsMessage';

export const applyValidationSchema = (schema: SchemaType, payloadType: string) => {
  let payload;
  const validate: Handler = async (req, res, next) => {
    try {
      if (payloadType === 'body') {
        payload = req.body;
        const queryArr = Object.keys(req.query);
        const paramsArr = Object.keys(req.params);

        if (queryArr.length || paramsArr.length) {
          throw customError(StatusCodes.BAD_REQUEST, errorMessage.INCORRECT_DATA);
        }
      }
      if (payloadType === 'query') {
        payload = req.query;
        const bodyArr = Object.keys(req.body);
        const paramsArr = Object.keys(req.params);

        if (bodyArr.length || paramsArr.length) {
          throw customError(StatusCodes.BAD_REQUEST, errorMessage.INCORRECT_DATA);
        }
      }
      if (payloadType === 'params') {
        payload = req.params;
        const bodyArr = Object.keys(req.body);
        const queryArr = Object.keys(req.query);

        if (bodyArr.length || queryArr.length) {
          throw customError(StatusCodes.BAD_REQUEST, errorMessage.INCORRECT_DATA);
        }
      }
      await schema.validate(payload);
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
  return validate;
};
