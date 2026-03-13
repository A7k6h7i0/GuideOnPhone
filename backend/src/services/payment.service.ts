import crypto from "crypto";
import { StatusCodes } from "http-status-codes";
import { env } from "../config/env.js";
import { PAYMENT_STATUS } from "../constants/paymentStatus.js";
import { AgentModel } from "../models/Agent.model.js";
import { BookingModel } from "../models/Booking.model.js";
import { PaymentModel } from "../models/Payment.model.js";
import { razorpayClient } from "../integrations/razorpay/client.js";
import { AppError } from "../middlewares/error.middleware.js";

export const paymentService = {
  async createOrder(bookingId: string, userId: string) {
    const booking = await BookingModel.findById(bookingId);
    if (!booking || booking.userId.toString() !== userId) {
      throw new AppError("Booking not found", StatusCodes.NOT_FOUND);
    }

    const existing = await PaymentModel.findOne({ bookingId });
    if (existing?.status === PAYMENT_STATUS.PAID) {
      throw new AppError("Booking already paid", StatusCodes.BAD_REQUEST);
    }

    if (!razorpayClient) {
      const payment = await PaymentModel.findOneAndUpdate(
        { bookingId: booking.id },
        {
          bookingId: booking.id,
          userId,
          agentId: booking.agentId,
          amount: booking.totalAmount,
          commissionAmount: booking.platformCommission,
          payoutAmount: booking.agentPayout,
          status: PAYMENT_STATUS.PENDING,
          provider: "RAZORPAY",
          orderId: `mock_${booking.id}`
        },
        { upsert: true, new: true }
      );
      return { orderId: payment.orderId, amount: booking.totalAmount, currency: "INR" };
    }

    const order = await razorpayClient.orders.create({
      amount: Math.round(booking.totalAmount * 100),
      currency: "INR",
      receipt: booking.id
    });

    await PaymentModel.findOneAndUpdate(
      { bookingId: booking.id },
      {
        bookingId: booking.id,
        userId,
        agentId: booking.agentId,
        amount: booking.totalAmount,
        commissionAmount: booking.platformCommission,
        payoutAmount: booking.agentPayout,
        status: PAYMENT_STATUS.PENDING,
        provider: "RAZORPAY",
        orderId: order.id
      },
      { upsert: true }
    );

    return { orderId: order.id, amount: booking.totalAmount, currency: "INR" };
  },

  async verifyAndMarkPaid(payload: { bookingId: string; razorpayOrderId: string; razorpayPaymentId: string; razorpaySignature: string }) {
    const payment = await PaymentModel.findOne({ bookingId: payload.bookingId });
    if (!payment) {
      throw new AppError("Payment record not found", StatusCodes.NOT_FOUND);
    }

    if (env.RAZORPAY_WEBHOOK_SECRET) {
      const generatedSignature = crypto
        .createHmac("sha256", env.RAZORPAY_WEBHOOK_SECRET)
        .update(`${payload.razorpayOrderId}|${payload.razorpayPaymentId}`)
        .digest("hex");

      if (generatedSignature !== payload.razorpaySignature) {
        throw new AppError("Invalid payment signature", StatusCodes.BAD_REQUEST);
      }
    }

    payment.status = PAYMENT_STATUS.PAID;
    payment.transactionId = payload.razorpayPaymentId;
    await payment.save();

    return payment;
  },

  async listForUser(userId: string) {
    return PaymentModel.find({ userId }).sort({ createdAt: -1 });
  },

  async listForAgent(userId: string) {
    const agent = await AgentModel.findOne({ userId });
    if (!agent) {
      throw new AppError("Agent not found", StatusCodes.NOT_FOUND);
    }

    return PaymentModel.find({ agentId: agent._id }).sort({ createdAt: -1 });
  },

  async getAgentSummary(userId: string) {
    const agent = await AgentModel.findOne({ userId });
    if (!agent) {
      throw new AppError("Agent not found", StatusCodes.NOT_FOUND);
    }

    const paidPayments = await PaymentModel.find({
      agentId: agent._id,
      status: PAYMENT_STATUS.PAID
    });

    const totalEarnings = paidPayments.reduce((sum, payment) => sum + payment.payoutAmount, 0);
    const totalCommission = paidPayments.reduce((sum, payment) => sum + payment.commissionAmount, 0);

    return {
      totalEarnings: Number(totalEarnings.toFixed(2)),
      totalCommission: Number(totalCommission.toFixed(2)),
      totalPaidBookings: paidPayments.length
    };
  }
};
