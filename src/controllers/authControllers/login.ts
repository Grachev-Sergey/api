import type { RequestHandler } from 'express';
import * as bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';

import type { User } from '../../db/entitys/User';
import { repositorys } from '../../db';

import { customError } from '../../utils/customError';
import errorsMessage from '../../utils/errorsMessage';
import { generateToken } from '../../utils/tokenGenerator';
import succsessMessage from '../../utils/succsessMessage';

type ParamsType = Record<string, never>;

type ResponseType = {
  user: User;
  token: string;
  message: string;
};

type BodyType = {
  email: string;
  password: string;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const login:HandlerType = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await repositorys.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .leftJoinAndSelect('user.rating', 'rating')
      .leftJoinAndSelect('user.favorite', 'favorite')
      .leftJoinAndSelect('user.cart', 'cart')
      .getOne();

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, errorsMessage.USER_NOT_FOUND);
    }

    const currentUserPass = await repositorys.userRepository
      .createQueryBuilder('user')
      .select('user.password')
      .where('user.email = :email', { email })
      .getRawOne();

    const validPass = bcrypt.compareSync(password, currentUserPass.user_password);
    if (!validPass) {
      throw customError(StatusCodes.BAD_REQUEST, errorsMessage.WRONG_PASS);
    }

    const token = generateToken(user.id);
    return res.json({ user, token, message: succsessMessage.LOGIN_SUCCESS });
  } catch (err) {
    next(err);
  }
};
