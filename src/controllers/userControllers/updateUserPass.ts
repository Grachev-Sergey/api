import type { RequestHandler } from 'express';
import * as bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';

import { repositorys } from '../../db';
import type { User } from '../../db/entitys/User';

import succsessMessage from '../../utils/succsessMessage';
import { customError } from '../../utils/customError';
import errorsMessage from '../../utils/errorsMessage';

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
      throw customError(StatusCodes.BAD_REQUEST, errorsMessage.WRONG_PASS);
    }

    user.password = bcrypt.hashSync(newPassword, 5);

    await repositorys.userRepository.save(user);
    delete user.password;

    const userWithNewPass = await repositorys.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .leftJoinAndSelect('user.rating', 'rating')
      .leftJoinAndSelect('user.favorite', 'favorite')
      .leftJoinAndSelect('user.cart', 'cart')
      .getOne();
    return res.json({ user: userWithNewPass, message: succsessMessage.UPDATE_USER });
  } catch (err) {
    next(err);
  }
};
