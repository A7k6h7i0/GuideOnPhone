import { StatusCodes } from "http-status-codes";
import { ROLES, type Role } from "../constants/roles.js";
import { UserModel } from "../models/User.model.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { signAccessToken, signRefreshToken } from "../utils/jwt.js";
import { AppError } from "../middlewares/error.middleware.js";

interface RegisterInput {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: Role;
}

interface LoginInput {
  email: string;
  password: string;
  expectedRole?: Role;
}

export const authService = {
  async register(input: RegisterInput) {
    const existing = await UserModel.findOne({ email: input.email });
    if (existing) {
      throw new AppError("Email already exists", StatusCodes.CONFLICT);
    }

    const hashed = await hashPassword(input.password);

    const user = await UserModel.create({
      ...input,
      password: hashed,
      role: input.role ?? ROLES.USER
    });

    const payload = { id: user.id, email: user.email, role: user.role };

    return {
      user,
      tokens: {
        accessToken: signAccessToken(payload),
        refreshToken: signRefreshToken(payload)
      }
    };
  },

  async login(input: LoginInput) {
    const user = await UserModel.findOne({ email: input.email });
    if (!user) {
      throw new AppError("Invalid credentials", StatusCodes.UNAUTHORIZED);
    }

    const isMatch = await comparePassword(input.password, user.password);
    if (!isMatch) {
      throw new AppError("Invalid credentials", StatusCodes.UNAUTHORIZED);
    }

    if (input.expectedRole && user.role !== input.expectedRole) {
      throw new AppError("Account role does not match this login portal", StatusCodes.UNAUTHORIZED);
    }

    const payload = { id: user.id, email: user.email, role: user.role };

    return {
      user,
      tokens: {
        accessToken: signAccessToken(payload),
        refreshToken: signRefreshToken(payload)
      }
    };
  }
};
