import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import succsessMessage from '../../utils/succsessMessage';
import { customError } from '../../utils/customError';
import errorsMessage from '../../utils/errorsMessage';
import { repositorys } from '../../db';

type ParamsType = {
  id: string;
};

type ResponseType = {
  message: string;
};

type BodyType = Record<string, never>;

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const deleteUser:HandlerType = async (req, res, next) => {
  try {
    const user = await repositorys.userRepository.findOneBy({ id: Number(req.params.id) });
    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, errorsMessage.USER_NOT_FOUND);
    }
    await repositorys.userRepository.remove(user);
    return res.json({ message: succsessMessage.DELETED });
  } catch (err) {
    next(err);
  }
};
