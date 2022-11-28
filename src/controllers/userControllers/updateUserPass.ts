import type { RequestHandler } from 'express';
import * as bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import type { User } from '../../db/entitys/User';
import { config } from '../../config';
import { customError } from '../../utils/error/customError';
import { WRONG_PASS } from '../../utils/error/errorsText';
import { repositorys } from '../../db';

type ParamsType = Record<string, never>;

type ResponseType = {
  user: User;
  message: string;
};

type BodyType = {
  oldPassword: string;
  newPassword: string;
  userId: number;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const updateUserPass: HandlerType = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = Number(req.body.userId);
    const user = await repositorys.userRepository.findOneBy({ id: userId });

    const currentUserPass = await repositorys.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .select('user.password')
      .getRawOne();

    const validPass = bcrypt.compareSync(oldPassword, currentUserPass.user_password);
    if (!validPass) {
      throw customError(StatusCodes.BAD_REQUEST, WRONG_PASS);
    }

    user.password = bcrypt.hashSync(newPassword, 5);

    await repositorys.userRepository.save(user);
    delete user.password;
    return res.json({ user, message: config.apiMessage.UPDATE_USER });
  } catch (err) {
    next(err);
  }
};
