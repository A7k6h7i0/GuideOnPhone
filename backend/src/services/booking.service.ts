import { StatusCodes } from "http-status-codes";
import { BOOKING_STATUS } from "../constants/bookingStatus.js";
import { env } from "../config/env.js";
import { AgentModel } from "../models/Agent.model.js";
import { BookingModel } from "../models/Booking.model.js";
import { AppError } from "../middlewares/error.middleware.js";

export const bookingService = {
  async create(userId: string, payload: { agentId: string; city: string; date: Date; durationHours: number; notes?: string }) {
    const agent = await AgentModel.findById(payload.agentId);
    if (!agent || !agent.isActive || agent.status !== "APPROVED") {
      throw new AppError("Agent is not available", StatusCodes.BAD_REQUEST);
    }

    const totalAmount = payload.durationHours * agent.guideFee;
    const platformCommission = Number(((totalAmount * env.PLATFORM_COMMISSION_PERCENT) / 100).toFixed(2));
    const agentPayout = Number((totalAmount - platformCommission).toFixed(2));

    return BookingModel.create({
      ...payload,
      userId,
      totalAmount,
      platformCommission,
      agentPayout,
      status: BOOKING_STATUS.PENDING
    });
  },

  async listForUser(userId: string) {
    return BookingModel.find({ userId }).populate({ path: "agentId", populate: { path: "userId", select: "name phone" } }).sort({ createdAt: -1 });
  },

  async listForAgent(userId: string) {
    const agent = await AgentModel.findOne({ userId });
    if (!agent) {
      throw new AppError("Agent not found", StatusCodes.NOT_FOUND);
    }

    return BookingModel.find({ agentId: agent.id }).populate("userId", "name phone email").sort({ createdAt: -1 });
  },

  async markCompleted(bookingId: string, userId: string) {
    const agent = await AgentModel.findOne({ userId });
    if (!agent) {
      throw new AppError("Agent not found", StatusCodes.NOT_FOUND);
    }

    const booking = await BookingModel.findOneAndUpdate(
      { _id: bookingId, agentId: agent.id },
      { status: BOOKING_STATUS.COMPLETED },
      { new: true }
    );

    if (!booking) {
      throw new AppError("Booking not found", StatusCodes.NOT_FOUND);
    }

    await AgentModel.findByIdAndUpdate(agent.id, { $inc: { totalCustomersServed: 1 } });

    return booking;
  }
};
