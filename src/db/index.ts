import { AppDataSource } from './data-source';
import { User } from './entity/User';

export const repositorys = {
  userRepository: AppDataSource.getRepository(User),
};
