import type { Request, Response } from "express";
import { userService } from "../services/user.service.js";

export const userController = {
  async me(req: Request, res: Response) {
    const data = await userService.getById(req.user!.id);
    res.json(data);
  },

  async updateMe(req: Request, res: Response) {
    const data = await userService.update(req.user!.id, req.body);
    res.json(data);
  }
};
