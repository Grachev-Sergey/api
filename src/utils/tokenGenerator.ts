import * as jwt from 'jsonwebtoken';
import { config } from '../config';

export const generateToken = (id: number) => {
  const payload = { id };
  return jwt.sign(payload, config.token.secretKey, { expiresIn: config.token.expiresIN });
};
