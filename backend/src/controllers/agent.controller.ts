import type { Request, Response } from "express";
import { agentService } from "../services/agent.service.js";

export const agentController = {
  async register(req: Request, res: Response) {
    const data = await agentService.register(req.body);
    res.status(201).json(data);
  },

  async sendAadhaarOtp(req: Request, res: Response) {
    const data = await agentService.sendAadhaarOtp(req.user!.id, req.body.aadhaarNumber);
    res.json(data);
  },

  async verifyAadhaarOtp(req: Request, res: Response) {
    const data = await agentService.verifyAadhaarOtp(req.user!.id, req.body.otp, req.body.sessionId);
    res.json(data);
  },

  async uploadSelfie(req: Request, res: Response) {
    const data = await agentService.uploadSelfie(req.user!.id, req.body.imageBase64);
    res.json(data);
  },

  async faceVerify(req: Request, res: Response) {
    const data = await agentService.faceVerify(req.user!.id);
    res.json(data);
  },

  async gstVerify(req: Request, res: Response) {
    const data = await agentService.gstVerify(req.user!.id, req.body.gstReferences);
    res.json(data);
  },

  async completeVerification(req: Request, res: Response) {
    const data = await agentService.completeVerification(req.user!.id);
    res.json(data);
  },

  async upsertMyProfile(req: Request, res: Response) {
    const data = await agentService.upsertProfile(req.user!.id, req.body);
    res.json(data);
  },

  async myProfile(req: Request, res: Response) {
    const data = await agentService.myProfile(req.user!.id);
    res.json(data);
  },

  async list(req: Request, res: Response) {
    const data = await agentService.listPublic({
      city: req.query.city as string | undefined,
      state: req.query.state as string | undefined,
      minRating: req.query.minRating ? Number(req.query.minRating) : undefined,
      maxFee: req.query.maxFee ? Number(req.query.maxFee) : undefined
    });
    res.json(data);
  },

  async getById(req: Request, res: Response) {
    const data = await agentService.getById(req.params.agentId);
    res.json(data);
  }
};
