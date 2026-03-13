import type { Request, Response } from "express";
import { paymentService } from "../services/payment.service.js";

export const paymentController = {
  async createOrder(req: Request, res: Response) {
    const data = await paymentService.createOrder(req.params.bookingId, req.user!.id);
    res.json(data);
  },

  async verify(req: Request, res: Response) {
    const data = await paymentService.verifyAndMarkPaid(req.body);
    res.json(data);
  },

  async myPayments(req: Request, res: Response) {
    const data = await paymentService.listForUser(req.user!.id);
    res.json(data);
  },

  async myAgentPayments(req: Request, res: Response) {
    const data = await paymentService.listForAgent(req.user!.id);
    res.json(data);
  },

  async myAgentSummary(req: Request, res: Response) {
    const data = await paymentService.getAgentSummary(req.user!.id);
    res.json(data);
  }
};
