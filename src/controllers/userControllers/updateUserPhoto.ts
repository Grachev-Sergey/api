import type { Handler } from 'express';
import * as fs from 'node:fs/promises';
import * as Uuid from 'uuid';
import { repositorys } from '../../db';

export const updateUserPhoto: Handler = async (req, res, next) => {
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
    return res.json({ user });
  } catch (err) {
    next(err);
  }
};
