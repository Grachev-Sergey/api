import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { config } from '../../config';
import { customError } from '../../utils/error/customError';
import { USER_NOT_FOUND } from '../../utils/error/errorsText';
import { repositorys } from '../../utils/repository';

export const deleteUser:Handler = async (req, res, next) => {
  try {
    const user = await repositorys.userRepository.findOneBy({id: Number(req.params.id)});
    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, USER_NOT_FOUND);
    }
    await repositorys.userRepository.remove(user);
    return res.json({massage: config.apiMessage.DELETED});
  } catch (err) {
    next(err);
  }
};