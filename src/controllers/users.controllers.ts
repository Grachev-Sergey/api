import {Request, Response} from 'express';
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (req: Request, res: Response) => {
  const {fullName, dob, email, password} = req.body;

  const user = new User() 
  user.fullName = fullName;
  user.dob = dob;
  user.email = email;
  user.password = password;

  await userRepository.save(user);

  return res.json(user);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await userRepository.find()
  return res.json(users);
};

export const updateUser = async (req: Request, res: Response) => {
  const {fullName, dob, email, password} = req.body;
  const user = await userRepository.findOneBy({id: req.params.id});

  if(!user) return res.status(404).json({massage: 'User not found'})

  user.fullName = fullName;
  user.dob = dob;
  user.email = email;
  user.password = password;

  await userRepository.save(user);

  return res.status(204);
};


export const deleteUser = async (req: Request, res: Response) => {

};