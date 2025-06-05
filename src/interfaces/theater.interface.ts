import { Document } from "mongoose";

export interface ITheaterAddress {
  street1: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface ITheaterGeo {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

export interface ITheaterLocation {
  address: ITheaterAddress;
  geo: ITheaterGeo;
}

export interface ITheater extends Document {
  theaterId: number;
  location: ITheaterLocation;
}
