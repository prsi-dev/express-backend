import { Router } from "express";
import {
  listMovies,
  getMovie,
  search,
  createNewMovie,
  updateExistingMovie,
  deleteExistingMovie,
} from "./movie.controller";
import { validate } from "../../middleware/validate.middleware";
import {
  createMovieSchema,
  updateMovieSchema,
  movieIdSchema,
  movieQuerySchema,
  movieSearchSchema,
} from "./movie.schema";

const router = Router();

// GET /api/movies - List movies with filters
router.get("/", validate(movieQuerySchema), listMovies);

// GET /api/movies/search - Search movies
router.get("/search", validate(movieSearchSchema), search);

// POST /api/movies - Create a new movie
router.post("/", validate(createMovieSchema), createNewMovie);

// GET /api/movies/:id - Get movie by ID
router.get("/:id", validate(movieIdSchema), getMovie);

// PUT /api/movies/:id - Update a movie
router.put("/:id", validate(updateMovieSchema), updateExistingMovie);

// DELETE /api/movies/:id - Delete a movie
router.delete("/:id", validate(movieIdSchema), deleteExistingMovie);

export default router;
