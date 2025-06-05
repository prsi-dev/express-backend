import { Document } from "mongoose";

export interface IMovieAwards {
  wins: number;
  nominations: number;
  text: string;
}

export interface IMovieIMDB {
  rating: number;
  votes: number;
  id: number;
}

export interface IMovieTomatoesViewer {
  rating: number;
  numReviews: number;
  meter: number;
}

export interface IMovieTomatoesCritic {
  rating: number;
  numReviews: number;
  meter: number;
}

export interface IMovieTomatoes {
  viewer: IMovieTomatoesViewer;
  fresh?: number;
  critic?: IMovieTomatoesCritic;
  rotten?: number;
  lastUpdated: Date;
}

export interface IMovie extends Document {
  plot: string;
  genres: string[];
  runtime: number;
  cast: string[];
  poster?: string;
  title: string;
  fullplot: string;
  languages: string[];
  released: Date;
  directors: string[];
  rated: string;
  awards: IMovieAwards;
  lastupdated: Date;
  year: number;
  imdb: IMovieIMDB;
  countries: string[];
  type: string;
  tomatoes: IMovieTomatoes;
  num_mflix_comments: number;
}
