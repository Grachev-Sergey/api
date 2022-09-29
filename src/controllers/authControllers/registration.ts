import * as bcrypt from 'bcryptjs';
import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { EMAIL_USED } from '../../utils/error/errorsText';
import { User } from '../../db/entity/User';
import { repositorys } from '../../utils/repository';
import { customError } from '../../utils/error/customError';
import { generateToken } from '../../utils/tokenGenerator';
import { config } from '../../config';

export const registrationUser:Handler = async (req, res, next) => {
  try {
    const {fullName, dob, email, password} = req.body;
    const checkUniq = await repositorys.userRepository.findOneBy({email});
    if (checkUniq) {
      throw customError(StatusCodes.BAD_REQUEST, EMAIL_USED);
    }

    const user = new User();
    user.fullName = fullName;
    user.dob = dob;
    user.email = email;
    user.password = bcrypt.hashSync(password, 5);

    await repositorys.userRepository.save(user);
    const token = generateToken(user.id);
    return res.json({user, token, message: config.apiMessage.REGISTRATION_SUCCESS});
  } catch (err) {
    next(err);
  }
};