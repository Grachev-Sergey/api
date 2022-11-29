import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { User } from '../../db/entitys/User';
import { customError } from '../../utils/customError';
import errorsMessage from '../../utils/errorsMessage';
import { repositorys } from '../../db';

type ParamsType = {
  id: string;
};

type ResponseType = {
  user: User;
};

type BodyType = Record<string, never>;

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const getUserById:HandlerType = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const user = await repositorys.userRepository.createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .getOne();
    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, errorsMessage.USER_NOT_FOUND);
    }

    return res.json({ user });
  } catch (err) {
    next(err);
  }
};
