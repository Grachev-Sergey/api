import { Handler } from "express";
import { StatusCodes } from "http-status-codes";
import * as jwt from 'jsonwebtoken';
import { customError } from "../../utils/error/customError";
import { NOT_AUTHORIZED } from "../../utils/error/errorsText";
import { responseError } from "./responseError";

export const tokenVerification:Handler = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    if(!token) {
      throw customError(StatusCodes.FORBIDDEN, NOT_AUTHORIZED);
    }
    jwt.verify(token, 'secret');
    next();
  } catch (err) {
    responseError(err, req, res, next);
  }
};