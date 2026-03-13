import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AgentModel } from "../models/Agent.model.js";
import { AdminLogModel } from "../models/AdminLog.model.js";
import { BookingModel } from "../models/Booking.model.js";
import { PaymentModel } from "../models/Payment.model.js";
import { AppError } from "../middlewares/error.middleware.js";

export const adminController = {
  async pendingAgents(_req: Request, res: Response) {
    const data = await AgentModel.find({ status: "PENDING_VERIFICATION" }).populate("userId", "name email phone");
    res.json(data);
  },

  async verifyAgent(req: Request, res: Response) {
    await AdminLogModel.create({
      adminId: req.user!.id,
      action: "MANUAL_AGENT_VERIFICATION_BLOCKED",
      targetType: "Agent",
      targetId: req.params.agentId,
      metadata: { reason: "Automated pipeline only" }
    });
    throw new AppError("Manual agent verification is disabled. Use automated verification pipeline.", StatusCodes.FORBIDDEN);
  },

  async analytics(_req: Request, res: Response) {
    const [totalBookings, totalRevenueAgg, pendingAgents] = await Promise.all([
      BookingModel.countDocuments(),
      PaymentModel.aggregate([{ $match: { status: "PAID" } }, { $group: { _id: null, revenue: { $sum: "$commissionAmount" } } }]),
      AgentModel.countDocuments({ status: "PENDING_VERIFICATION" })
    ]);

    res.json({
      totalBookings,
      platformRevenue: totalRevenueAgg[0]?.revenue ?? 0,
      pendingAgents
    });
  }
};
