import type { Handler } from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'node:fs/promises';
import { config } from '../../config';
import { repositorys } from '../../db';

export const updateUserPhoto: Handler = async (req, res, next) => {
  try {
    const { avatar } = req.body;

    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, config.token.secretKey) as { id: number };
    const user = await repositorys.userRepository.findOneBy({ id: payload.id });



    await repositorys.userRepository.save(user);
    return res.json({ user, message: config.apiMessage.UPDATE_USER });
  } catch (err) {
    next(err);
  }
};




  try {

    const avatarExtension = avatar.substring('data:image/'.length, avatar.indexOf(';base64'));

    const avatarName = `${Date.now()}.${avatarExtension}`;

    const path = `static/${avatarName}`;

    const base64Data = avatar.replace(/^data:([A-Za-z-+/]+);base64,/, '');

    fs.writeFile(path, base64Data, { encoding: 'base64' });

    const avatarPath = `http://localhost:5000/${avatarName}`;

    findUser.avatar = avatarPath;

    const user = await db.userRepository.save(findUser);

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const { file } = req.body;
const { user } = req;

const fileData = file.split('base64,')[1];
const fileType = file.split(';')[0].split('/')[1];

const fileName = `${user.email.split('@')[0]}-${Date.now()}.${fileType}`;

await fs.promises.unlink(
  `${path.resolve(__dirname, '../../source/images/users', user.avatar.split('static/users/')[1])}`,
);

await fs.promises.writeFile(
  `${path.resolve(__dirname, '../../source/images/users', fileName)}`,
  fileData,
  { encoding: 'base64' },
);

user.avatar = fileName;

await db.user.save(user);
user.avatar = convertToFinalUrl(user.avatar, 'users');
return res.send({ user });