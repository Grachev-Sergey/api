import type { RequestHandler } from 'express';
import * as fs from 'node:fs/promises';
import * as Uuid from 'uuid';
import type { User } from '../../db/entitys/User';
import { repositorys } from '../../db';

type ParamsType = Record<string, never>;

type ResponseType = {
  user: User;
};

type BodyType = {
  avatar: string;
  userId: number;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const updateUserPhoto: HandlerType = async (req, res, next) => {
  try {
    const { avatar, userId } = req.body;
    const user = await repositorys.userRepository.findOneBy({ id: userId });

    const avatarData = avatar.split('base64,')[1];
    const avatarType = avatar.split(';')[0].split('/')[1];
    const randomName = Uuid.v4();
    const avatarName = `${randomName}.${avatarType}`;
    const route = `static/${avatarName}`;

    if (user.avatar) {
      const oldName = user.avatar;
      fs.unlink(`static/${oldName.slice(22)}`);
    }
    fs.writeFile(route, avatarData, { encoding: 'base64' });

    user.avatar = avatarName;
    await repositorys.userRepository.save(user);

    const userWithNewAvatar = await repositorys.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .leftJoinAndSelect('user.rating', 'rating')
      .leftJoinAndSelect('user.favorite', 'favorite')
      .leftJoinAndSelect('user.cart', 'cart')
      .getOne();
    return res.json({ user: userWithNewAvatar });
  } catch (err) {
    next(err);
  }
};
