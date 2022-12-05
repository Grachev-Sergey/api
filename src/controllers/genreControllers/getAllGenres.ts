import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import type { Genre } from '../../db/entities/Genre';
import { repositorys } from '../../db';

import { customError } from '../../utils/createCustomError';

type ParamsType = Record<string, never>;

type ResponseType = {
  genres: Genre[];
};

type BodyType = Record<string, never>;

type QueryType = Record<string, never>;

type HandlerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const getAllGenres:HandlerType = async (req, res, next) => {
  try {
    const genres = await repositorys.genreRepository.find();
    if (!genres) {
      throw customError(StatusCodes.BAD_REQUEST, 'genres not found');
    }
    return res.json({ genres });
  } catch (err) {
    next(err);
  }
};
