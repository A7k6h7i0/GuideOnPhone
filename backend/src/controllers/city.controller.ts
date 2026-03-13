import type { Request, Response } from "express";
import { cityService } from "../services/city.service.js";

export const cityController = {
  async list(_req: Request, res: Response) {
    const data = await cityService.list();
    res.json(data);
  }
};
