import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken'
import * as yup from 'yup';
import { INCORRECT_DATA, SERVER_ERROR } from '../../utils/error/errorsText';
import { INVALID_TOKEN } from '../../utils/error/errorsText';



export const responseError:ErrorRequestHandler = (err, req, res, next) => {
  if ('localData' in err) {
    return res.status(err.localData.status).json(err.localData);
  }
  if (err instanceof yup.ValidationError){
    return res.status(StatusCodes.BAD_REQUEST).json(INCORRECT_DATA);
  }
  if(err instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.FORBIDDEN).json(INVALID_TOKEN);
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(SERVER_ERROR);
};