import { AppDataSource } from './dataSource';

import { Book } from './entities/Book';
import { Cart } from './entities/Cart';
import { Comment } from './entities/Comments';
import { Favorite } from './entities/Favorite';
import { Genre } from './entities/Genre';
import { Rating } from './entities/Rating';
import { User } from './entities/User';

export const repositorys = {
  userRepository: AppDataSource.getRepository(User),
  bookRepository: AppDataSource.getRepository(Book),
  genreRepository: AppDataSource.getRepository(Genre),
  ratingRepository: AppDataSource.getRepository(Rating),
  favoriteRepository: AppDataSource.getRepository(Favorite),
  commentRepository: AppDataSource.getRepository(Comment),
  cartRepository: AppDataSource.getRepository(Cart),
};
