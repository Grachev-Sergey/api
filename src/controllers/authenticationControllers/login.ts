import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { repositorys } from '../../utils/repository';
import { customError } from '../../utils/error/customError';
import { responseError } from '../../db/middlewere/responseError';
import { USER_NOT_FOUND, WRONG_PASS } from '../../utils/error/errorsText';

const generateToken = (id: number) => {
  const payload = {id}
  return jwt.sign(payload, 'secret', {expiresIn: "1h"});
};

export const login:Handler = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const user = await repositorys.userRepository.findOneBy({email});
    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, USER_NOT_FOUND);
    }

    const validPass = bcrypt.compareSync(password, user.password);
    if (!validPass) {
      throw customError(StatusCodes.BAD_REQUEST, WRONG_PASS);
    }
  
    const token = generateToken(user.id);
    return res.json({token, message: 'Login completed successfully'});
  } catch (err) {
    responseError(err, req, res, next);
  }
};
