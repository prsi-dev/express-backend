import { Request, Response, NextFunction } from "express";
import {
  getMovies,
  getMovieById,
  searchMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  MovieQuery,
} from "./movie.service";
import { createNotFoundError, createDatabaseError } from "../../utils/errors";

export const listMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query: MovieQuery = {
      title: req.query.title as string,
      year: req.query.year ? parseInt(req.query.year as string) : undefined,
      genres: req.query.genres
        ? (req.query.genres as string).split(",")
        : undefined,
      minRating: req.query.minRating
        ? parseFloat(req.query.minRating as string)
        : undefined,
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
    };

    const result = await getMovies(query);
    res.json(result);
  } catch (error) {
    next(createDatabaseError("Failed to fetch movies"));
  }
};

export const getMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const movie = await getMovieById(req.params.id);
    if (!movie) {
      next(createNotFoundError("Movie not found"));
      return;
    }
    res.json(movie);
  } catch (error) {
    next(createDatabaseError("Failed to fetch movie"));
  }
};

export const search = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const searchTerm = req.query.q as string;
    const results = await searchMovies(searchTerm);
    res.json(results);
  } catch (error) {
    next(createDatabaseError("Failed to search movies"));
  }
};

export const createNewMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const movieData = req.body;
    const movie = await createMovie(movieData);
    res.status(201).json(movie);
  } catch (error) {
    next(createDatabaseError("Failed to create movie"));
  }
};

export const updateExistingMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const movieData = req.body;
    const movie = await updateMovie(id, movieData);

    if (!movie) {
      next(createNotFoundError("Movie not found"));
      return;
    }

    res.json(movie);
  } catch (error) {
    next(createDatabaseError("Failed to update movie"));
  }
};

export const deleteExistingMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const movie = await deleteMovie(id);

    if (!movie) {
      next(createNotFoundError("Movie not found"));
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(createDatabaseError("Failed to delete movie"));
  }
};
