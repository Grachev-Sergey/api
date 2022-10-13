import type { Handler } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../../config';
import { repositorys } from '../../db';

export const updateUserInfo: Handler = async (req, res, next) => {
  try {
    const { fullName, email } = req.body;
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, config.token.secretKey) as { id: number };
    const user = await repositorys.userRepository.findOneBy({ id: payload.id });

    user.fullName = fullName;
    user.email = email;

    await repositorys.userRepository.save(user);
    return res.json({ massage: config.apiMessage.UPDATE_USER });
  } catch (err) {
    next(err);
  }
};
