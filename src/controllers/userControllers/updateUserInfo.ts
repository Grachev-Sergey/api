import type { Handler } from 'express';
// import * as jwt from 'jsonwebtoken';
import { config } from '../../config';
import { repositorys } from '../../db';

export const updateUserInfo: Handler = async (req, res, next) => {
  try {
    const { fullName, email, userId } = req.body;

    const user = await repositorys.userRepository.findOneBy({ id: userId });
    user.fullName = fullName;
    user.email = email;

    await repositorys.userRepository.save(user);
    return res.json({ massage: config.apiMessage.UPDATE_USER });
  } catch (err) {
    next(err);
  }
};
