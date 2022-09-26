import { ErrorRequestHandler } from 'express';

export const responseError:ErrorRequestHandler = (err, req, res, next) => {
  if (err) {
    return res.status(err.localData.status).json(err.localData);
  }
  return res.status(500).json('some error');
};