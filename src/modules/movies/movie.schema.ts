import { z } from "zod";

const movieAwardsSchema = z.object({
  wins: z.number().int().min(0),
  nominations: z.number().int().min(0),
  text: z.string(),
});

const movieImdbSchema = z.object({
  rating: z.number().min(0).max(10),
  votes: z.number().int().min(0),
  id: z.number().int().min(0),
});

const movieTomatoesViewerSchema = z.object({
  rating: z.number().min(0).max(5),
  numReviews: z.number().int().min(0),
  meter: z.number().min(0).max(100),
});

const movieTomatoesSchema = z.object({
  viewer: movieTomatoesViewerSchema,
  lastUpdated: z.string().datetime(),
});

export const createMovieSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(255),
    plot: z.string().min(1),
    fullplot: z.string().min(1),
    genres: z.array(z.string()).min(1),
    runtime: z.number().int().positive(),
    cast: z.array(z.string()).min(1),
    languages: z.array(z.string()).min(1),
    released: z.string().datetime(),
    directors: z.array(z.string()).min(1),
    rated: z.string(),
    awards: movieAwardsSchema,
    year: z.number().int().min(1888),
    imdb: movieImdbSchema,
    countries: z.array(z.string()).min(1),
    type: z.string(),
    tomatoes: movieTomatoesSchema,
    lastupdated: z.string().datetime(),
  }),
});

export const updateMovieSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: createMovieSchema.shape.body.partial(),
});

export const movieIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export const movieQuerySchema = z.object({
  query: z.object({
    title: z.string().optional(),
    year: z
      .string()
      .transform((val) => (val ? parseInt(val) : undefined))
      .optional(),
    genres: z
      .string()
      .transform((val) => (val ? val.split(",") : undefined))
      .optional(),
    minRating: z
      .string()
      .transform((val) => (val ? parseFloat(val) : undefined))
      .optional(),
    page: z
      .string()
      .transform((val) => (val ? parseInt(val) : 1))
      .optional(),
    limit: z
      .string()
      .transform((val) => (val ? parseInt(val) : 10))
      .optional(),
  }),
});

export const movieSearchSchema = z.object({
  query: z.object({
    q: z.string().min(1),
  }),
});
