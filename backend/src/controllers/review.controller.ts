import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { reviewService } from "../services/review.service.js";

export const reviewController = {
  async create(req: Request, res: Response) {
    const data = await reviewService.create(req.user!.id, req.body);
    res.status(StatusCodes.CREATED).json(data);
  }
};
