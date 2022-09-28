import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SERVER_ERROR } from '../../utils/error/errorsText';

export const responseError:ErrorRequestHandler = (err, req, res, next) => {
  if ('localData' in err) {
    return res.status(err.localData.status).json(err.localData);
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(SERVER_ERROR);
};