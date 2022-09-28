import { Handler } from "express";
import { StatusCodes } from "http-status-codes";
import * as jwt from 'jsonwebtoken';
import { customError } from "../../utils/error/customError";
import { INVALID_TOKEN, NOT_AUTHORIZED } from "../../utils/error/errorsText";
import { responseError } from "./responseError";
import { repositorys } from "../../utils/repository";

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
    res.status(StatusCodes.FORBIDDEN).json(INVALID_TOKEN);
  }
};