import type { RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import type { User } from '../../db/entitys/User';
import { config } from '../../config';
import { repositorys } from '../../db';
import { customError } from '../../utils/error/customError';
import { USER_NOT_FOUND } from '../../utils/error/errorsText';

type ParamsType = Record<string, never>;

type ResponseType = {
  user: User;
};

type BodyType = Record<string, never>;

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const getUser:HandlerType = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, config.token.secretKey) as { id: number };
    const userId = payload.id;

    const user = await repositorys.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .leftJoinAndSelect('user.rating', 'rating')
      .leftJoinAndSelect('user.favorite', 'favorite')
      .leftJoinAndSelect('user.cart', 'cart')
      .getOne();

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, USER_NOT_FOUND);
    }

    return res.json({ user });
  } catch (err) {
    next(err);
  }
};
