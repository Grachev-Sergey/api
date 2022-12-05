import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { repositorys } from '../../db';

import succsessMessage from '../../utils/succsessMessage';
import { customError } from '../../utils/createCustomError';
import errorsMessage from '../../utils/errorsMessage';

type ParamsType = {
  userId: string;
};

type ResponseType = {
  message: string;
};

type BodyType = Record<string, never>;

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const deleteUser:HandlerType = async (req, res, next) => {
  try {
    const user = await repositorys.userRepository.findOneBy({ id: Number(req.params.userId) });
    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, errorsMessage.USER_NOT_FOUND);
    }
    await repositorys.userRepository.remove(user);
    return res.json({ message: succsessMessage.DELETED });
  } catch (err) {
    next(err);
  }
};
