import type { Handler } from 'express';
import * as bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { config } from '../../config';
import { customError } from '../../utils/error/customError';
import { WRONG_PASS } from '../../utils/error/errorsText';
import { repositorys } from '../../db';

export const updateUserPass: Handler = async (req, res, next) => {
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
