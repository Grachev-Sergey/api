import type { RequestHandler } from 'express';
import succsessMessage from '../../utils/succsessMessage';
import { repositorys } from '../../db';

type ParamsType = Record<string, never>;

type ResponseType = {
  message: string;
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
    return res.json({ message: succsessMessage.UPDATE_USER });
  } catch (err) {
    next(err);
  }
};
