import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { authService } from "../services/auth.service.js";

export const authController = {
  async register(req: Request, res: Response) {
    const data = await authService.register(req.body);
    res.status(StatusCodes.CREATED).json(data);
  },

  async login(req: Request, res: Response) {
    const data = await authService.login(req.body);
    res.status(StatusCodes.OK).json(data);
  }
};
