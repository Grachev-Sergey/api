import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {Handler, Request, Response} from 'express';
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';

const userRepository = AppDataSource.getRepository(User);

const generateToken = (id: number) => {
  const payload = {id}
  return jwt.sign(payload, 'secret', {expiresIn: "12h"})
};

export const registrationUser:Handler = async (req, res) => {
  const {fullName, dob, email, password} = req.body;
  const checkUniq = await userRepository.findOneBy({email});
  if (checkUniq) return res.status(400).json({massage: 'User with this email is already registered'});

  const user = new User();
  user.fullName = fullName;
  user.dob = dob;
  user.email = email;
  user.password = bcrypt.hashSync(password, 5);

  await userRepository.save(user);
  const token = generateToken(user.id);
  return res.json({user, token, message: 'Registration completed successfully'});
};

export const login = async (req: Request, res: Response) => {
  const {email, password} = req.body;
  const user = await userRepository.findOneBy({email});
  if (!user) return res.status(400).json({massage: 'User not found'});

  const validPass = bcrypt.compareSync(password, user.password);
  if (!validPass) return res.status(400).json({massage: 'Wrong password entered'});

  const token = generateToken(user.id)
  return res.json({token, message: 'Login completed successfully'})
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await userRepository.find();
  return res.json(users);
};

export const updateUser = async (req: Request, res: Response) => {
  const {fullName, dob, email, password} = req.body;
  const user = await userRepository.findOneBy({id: Number(req.params.id)});
  if(!user) return res.status(404).json({massage: 'User not found'});

  user.fullName = fullName;
  user.dob = dob;
  user.email = email;
  user.password = password;

  await userRepository.save(user);
  return res.status(204).json({massage: 'User data updated successfully'});
};


export const deleteUser = async (req: Request, res: Response, next) => {
  const user = await userRepository.findOneBy({id: Number(req.params.id)});
  if(!user) return res.status(404).json({massage: 'User not found'});
  await userRepository.remove(user);
  return res.status(204).json({massage: 'User deleted'});
};


export class CustomError extends Error{
  localData: {
    message: string;
    status: number;
    payload?: any;
  }
}

const foo = (status: number, message: string, payload?: any) => {
  const error = new Error(message) as CustomError;
  error.localData = {
    message,
    status,
    payload
  }
  return error;
}