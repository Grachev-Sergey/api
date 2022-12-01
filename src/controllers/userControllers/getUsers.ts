import type { RequestHandler } from 'express';

import { repositorys } from '../../db';
import type { User } from '../../db/entitys/User';

type ParamsType = Record<string, never>;

type ResponseType = {
  users: User[];
};

type BodyType = Record<string, never>;

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const getUsers:HandlerType = async (req, res, next) => {
  try {
    const users = await repositorys.userRepository.find();
    return res.json({ users });
  } catch (err) {
    next(err);
  }
};
