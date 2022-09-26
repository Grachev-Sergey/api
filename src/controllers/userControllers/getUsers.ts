import { Handler } from 'express';
import { repositorys } from '../../utils/repository';
import { responseError } from '../../db/middlewere/responseError';


export const getUsers:Handler = async (req, res, next) => {
  try {
    const users = await repositorys.userRepository.find();
    return res.json(users);
  } catch (err) {
    responseError(err, req, res, next);
  }
};
