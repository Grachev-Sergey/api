import type { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import errorMessage from '../utils/errorsMessage';
import { CustomError } from '../utils/createCustomError';

export const errorsHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.localData.status).json(err.localData);
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage.SERVER_ERROR);
};
