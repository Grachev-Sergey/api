import type { RequestHandler } from 'express';

import { repositorys } from '../../db';
import type { User } from '../../db/entities/User';

type ParamsType = Record<string, never>;

type ResponseType = {
  user: User;
};

type BodyType = {
  fullName: string;
  email: string;
  userId: number;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const updateUserInfo: HandlerType = async (req, res, next) => {
  try {
    const { fullName, email, userId } = req.body;

    const user = await repositorys.userRepository.findOneBy({ id: userId });
    user.fullName = fullName;
    user.email = email;

    await repositorys.userRepository.save(user);
    const userWithNewInfo = await repositorys.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .leftJoinAndSelect('user.rating', 'rating')
      .leftJoinAndSelect('user.favorite', 'favorite')
      .leftJoinAndSelect('user.cart', 'cart')
      .getOne();
    return res.json({ user: userWithNewInfo });
  } catch (err) {
    next(err);
  }
};
