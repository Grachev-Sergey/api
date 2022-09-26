import { CustomError } from '../../utils/error/customError';
import { ErrorRequestHandler } from 'express';

export const responseError:ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.localData.status).json(err.localData);
  }
  next();
};