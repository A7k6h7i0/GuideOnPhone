import mongoose, { Schema, Types } from "mongoose";
import type { ICity } from "../interfaces/City.js";

export interface CityDocument extends ICity {
  _id: Types.ObjectId;
}

const citySchema = new Schema<CityDocument>(
  {
    name: { type: String, required: true },
    state: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    isPopular: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const CityModel = mongoose.model<CityDocument>("City", citySchema);
