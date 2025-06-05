import { FilterQuery } from "mongoose";
import { IMovie } from "../../interfaces/movie.interface";
import { Movie } from "./model";

export interface MovieQuery {
  title?: string;
  year?: number;
  genres?: string[];
  minRating?: number;
  page?: number;
  limit?: number;
}

export interface MovieListResponse {
  movies: IMovie[];
  total: number;
  page: number;
  totalPages: number;
}

export const getMovies = async (
  query: MovieQuery
): Promise<MovieListResponse> => {
  const { title, year, genres, minRating, page = 1, limit = 10 } = query;

  const filter: FilterQuery<IMovie> = {};

  if (title) {
    filter.title = { $regex: title, $options: "i" };
  }

  if (year) {
    filter.year = year;
  }

  if (genres?.length) {
    filter.genres = { $in: genres };
  }

  if (minRating) {
    filter["imdb.rating"] = { $gte: minRating };
  }

  const skip = (page - 1) * limit;

  const [movies, total] = await Promise.all([
    Movie.find(filter)
      .sort({ "imdb.rating": -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Movie.countDocuments(filter),
  ]);

  return {
    movies,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getMovieById = async (id: string): Promise<IMovie | null> => {
  return Movie.findById(id).lean();
};

export const searchMovies = async (searchTerm: string): Promise<IMovie[]> => {
  return Movie.find({
    $or: [
      { title: { $regex: searchTerm, $options: "i" } },
      { plot: { $regex: searchTerm, $options: "i" } },
      { fullplot: { $regex: searchTerm, $options: "i" } },
    ],
  })
    .sort({ "imdb.rating": -1 })
    .limit(10)
    .lean();
};

export const createMovie = async (
  movieData: Partial<IMovie>
): Promise<IMovie> => {
  const movie = new Movie(movieData);
  return movie.save();
};

export const updateMovie = async (
  id: string,
  movieData: Partial<IMovie>
): Promise<IMovie | null> => {
  return Movie.findByIdAndUpdate(
    id,
    { $set: movieData },
    { new: true, runValidators: true }
  ).lean();
};

export const deleteMovie = async (id: string): Promise<IMovie | null> => {
  return Movie.findByIdAndDelete(id).lean();
};
