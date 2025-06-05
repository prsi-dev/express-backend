import mongoose, { Schema } from "mongoose";
import { ITheater } from "../../interfaces/theater.interface";

const TheaterSchema = new Schema<ITheater>(
  {
    theaterId: { type: Number, required: true, unique: true },
    location: {
      address: {
        street1: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipcode: { type: String, required: true },
      },
      geo: {
        type: {
          type: String,
          enum: ["Point"],
          required: true,
        },
        coordinates: {
          type: [Number],
          required: true,
          validate: {
            validator: function (v: number[]) {
              return (
                v.length === 2 &&
                v[0] >= -180 &&
                v[0] <= 180 && // longitude
                v[1] >= -90 &&
                v[1] <= 90
              ); // latitude
            },
            message: "Invalid coordinates",
          },
        },
      },
    },
  },
  {
    timestamps: true,
    collection: "theaters",
  }
);

// Create a 2dsphere index for geospatial queries
TheaterSchema.index({ "location.geo": "2dsphere" });
// Index for theaterId lookups
TheaterSchema.index({ theaterId: 1 });
// Compound index for location-based searches
TheaterSchema.index({
  "location.address.state": 1,
  "location.address.city": 1,
});

export const Theater = mongoose.model<ITheater>("Theater", TheaterSchema);
