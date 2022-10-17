import { AppDataSource } from './data-source';
import { Book } from './entitys/Book';
import { User } from './entitys/User';

export const repositorys = {
  userRepository: AppDataSource.getRepository(User),
  bookRepository: AppDataSource.getRepository(Book),
};
