import type { RequestHandler } from 'express';
import { repositorys } from '../../db';
import { Genre } from '../../db/entitys/Genre';

type ParamsType = Record<string, never>;

type ResponseType = {
  message: string;
};

type BodyType = {
  name: string;
};

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const addGenre:HandlerType = async (req, res, next) => {
  try {
    const { name } = req.body;

    const genre = new Genre();
    genre.name = name;

    await repositorys.genreRepository.save(genre);
    return res.json({ message: 'genre added' });
  } catch (err) {
    next(err);
  }
};
