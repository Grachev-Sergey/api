import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { repositorys } from '../../db';
import { customError } from '../../utils/error/customError';

export const getAllGenres:Handler = async (req, res, next) => {
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
