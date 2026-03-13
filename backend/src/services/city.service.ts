import { CityModel } from "../models/City.model.js";

export const cityService = {
  async list() {
    return CityModel.find().sort({ isPopular: -1, name: 1 });
  }
};
