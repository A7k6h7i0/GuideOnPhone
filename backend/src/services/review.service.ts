import { ReviewModel } from "../models/Review.model.js";
import { BookingModel } from "../models/Booking.model.js";
import { AgentModel } from "../models/Agent.model.js";
import { AppError } from "../middlewares/error.middleware.js";
import { BOOKING_STATUS } from "../constants/bookingStatus.js";

export const reviewService = {
  async create(userId: string, payload: { bookingId: string; rating: number; comment?: string }) {
    const booking = await BookingModel.findById(payload.bookingId);

    if (!booking || booking.userId.toString() !== userId) {
      throw new AppError("Booking not found");
    }

    if (booking.status !== BOOKING_STATUS.COMPLETED) {
      throw new AppError("Review allowed only for completed bookings");
    }

    const review = await ReviewModel.create({
      bookingId: booking.id,
      userId,
      agentId: booking.agentId,
      rating: payload.rating,
      comment: payload.comment
    });

    const stats = await ReviewModel.aggregate([
      { $match: { agentId: booking.agentId } },
      { $group: { _id: "$agentId", avg: { $avg: "$rating" } } }
    ]);

    await AgentModel.findByIdAndUpdate(booking.agentId, { avgRating: stats[0]?.avg ?? 0 });

    return review;
  }
};
