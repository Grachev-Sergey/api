import { AppDataSource } from '../db/data-source';
import { User } from '../db/entity/User';

export const repositorys = {
  userRepository: AppDataSource.getRepository(User),
};