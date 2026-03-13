import mongoose, { Schema, Types } from "mongoose";
import { PAYMENT_STATUS } from "../constants/paymentStatus.js";
import type { IPayment } from "../interfaces/Payment.js";

export interface PaymentDocument extends Omit<IPayment, "bookingId" | "userId" | "agentId"> {
  _id: Types.ObjectId;
  bookingId: Types.ObjectId;
  userId: Types.ObjectId;
  agentId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<PaymentDocument>(
  {
    bookingId: { type: Schema.Types.ObjectId, ref: "Booking", required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    agentId: { type: Schema.Types.ObjectId, ref: "Agent", required: true },
    amount: { type: Number, required: true },
    commissionAmount: { type: Number, required: true },
    payoutAmount: { type: Number, required: true },
    status: { type: String, enum: Object.values(PAYMENT_STATUS), default: PAYMENT_STATUS.PENDING },
    provider: { type: String, enum: ["RAZORPAY"], default: "RAZORPAY" },
    orderId: { type: String },
    transactionId: { type: String }
  },
  { timestamps: true }
);

export const PaymentModel = mongoose.model<PaymentDocument>("Payment", paymentSchema);
