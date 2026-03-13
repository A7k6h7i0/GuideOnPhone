import { StatusCodes } from "http-status-codes";
import { UserModel } from "../models/User.model.js";
import { AppError } from "../middlewares/error.middleware.js";

export const userService = {
  async getById(userId: string) {
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }
    return user;
  },

  async update(userId: string, payload: Partial<{ name: string; phone: string; avatarUrl: string }>) {
    const user = await UserModel.findByIdAndUpdate(userId, payload, { new: true }).select("-password");
    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }
    return user;
  }
};
