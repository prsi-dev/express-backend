import mongoose, { Schema } from "mongoose";
import { IMovie } from "../../interfaces/movie.interface";

const MovieSchema = new Schema<IMovie>(
  {
    plot: { type: String, required: true },
    genres: { type: [String], required: true },
    runtime: { type: Number, required: true },
    cast: { type: [String], required: true },
    poster: { type: String },
    title: { type: String, required: true },
    fullplot: { type: String, required: true },
    languages: { type: [String], required: true },
    released: { type: Date, required: true },
    directors: { type: [String], required: true },
    rated: { type: String, required: true },
    awards: {
      wins: { type: Number, required: true },
      nominations: { type: Number, required: true },
      text: { type: String, required: true },
    },
    lastupdated: { type: Date, required: true },
    year: { type: Number, required: true },
    imdb: {
      rating: { type: Number, required: true },
      votes: { type: Number, required: true },
      id: { type: Number, required: true },
    },
    countries: { type: [String], required: true },
    type: { type: String, required: true },
    tomatoes: {
      viewer: {
        rating: { type: Number, required: true },
        numReviews: { type: Number, required: true },
        meter: { type: Number, required: true },
      },
      fresh: { type: Number },
      critic: {
        rating: { type: Number },
        numReviews: { type: Number },
        meter: { type: Number },
      },
      rotten: { type: Number },
      lastUpdated: { type: Date, required: true },
    },
    num_mflix_comments: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
    collection: "movies",
  }
);

// Indexes for better query performance
MovieSchema.index({ title: 1 });
MovieSchema.index({ year: 1 });
MovieSchema.index({ "imdb.rating": 1 });
MovieSchema.index({ genres: 1 });

export const Movie = mongoose.model<IMovie>("Movie", MovieSchema);
