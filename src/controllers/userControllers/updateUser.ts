import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { customError } from '../../utils/error/customError';
import { USER_NOT_FOUND } from '../../utils/error/errorsText';
import { repositorys } from '../../utils/repository';

export const updateUser:Handler = async (req, res, next) => {
  try {
    const {fullName, dob, email, password} = req.body;
    const user = await repositorys.userRepository.findOneBy({id: Number(req.params.id)});
    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, USER_NOT_FOUND);
    }
  
    user.fullName = fullName;
    user.dob = dob;
    user.email = email;
    user.password = password;
  
    await repositorys.userRepository.save(user);
    return res.json({massage: 'User data updated successfully'});
  } catch (err) {
    next(err);
  }
};