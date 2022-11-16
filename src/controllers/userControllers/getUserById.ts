import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { customError } from '../../utils/error/customError';
import { USER_NOT_FOUND } from '../../utils/error/errorsText';
import { repositorys } from '../../db';

export const getUserById:Handler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const user = await repositorys.userRepository.createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .getOne();
    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, USER_NOT_FOUND);
    }

    return res.json({ user });
  } catch (err) {
    next(err);
  }
};
