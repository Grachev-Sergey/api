import type { Handler } from 'express';
import * as bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { config } from '../../config';
import { customError } from '../../utils/error/customError';
import { USER_NOT_FOUND, WRONG_PASS } from '../../utils/error/errorsText';
import { repositorys } from '../../db';

export const updateUserPass: Handler = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, config.token.secretKey) as { id: number };
    const id = payload.id;
    const user = await repositorys.userRepository.findOneBy({ id: payload.id });

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, USER_NOT_FOUND);
    }

    const currentUserPass = await repositorys.userRepository
      .createQueryBuilder('user')
      .select('user.password')
      .where('user.id = :id', { id })
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
