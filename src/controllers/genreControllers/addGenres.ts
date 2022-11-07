import type { Handler } from 'express';
import { repositorys } from '../../db';
import { Genre } from '../../db/entitys/Genre';

export const addGenre:Handler = async (req, res, next) => {
  try {
    const {
      name,
    } = req.body;

    const genre = new Genre();
    genre.name = name;

    await repositorys.genreRepository.save(genre);
    return res.json({ message: 'genre added' });
  } catch (err) {
    next(err);
  }
};
