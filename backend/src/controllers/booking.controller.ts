import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bookingService } from "../services/booking.service.js";

export const bookingController = {
  async create(req: Request, res: Response) {
    const data = await bookingService.create(req.user!.id, req.body);
    res.status(StatusCodes.CREATED).json(data);
  },

  async myUserBookings(req: Request, res: Response) {
    const data = await bookingService.listForUser(req.user!.id);
    res.json(data);
  },

  async myAgentBookings(req: Request, res: Response) {
    const data = await bookingService.listForAgent(req.user!.id);
    res.json(data);
  },

  async markCompleted(req: Request, res: Response) {
    const data = await bookingService.markCompleted(req.params.bookingId, req.user!.id);
    res.json(data);
  }
};
