import type { Handler } from 'express';
import { repositorys } from '../../db';

export const getUsers:Handler = async (req, res, next) => {
  try {
    const users = await repositorys.userRepository.find();
    return res.json({ users });
  } catch (err) {
    next(err);
  }
};
