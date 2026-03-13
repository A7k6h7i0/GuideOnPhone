import mongoose, { Schema, Types } from "mongoose";
import { BOOKING_STATUS } from "../constants/bookingStatus.js";
import type { IBooking } from "../interfaces/Booking.js";

export interface BookingDocument extends Omit<IBooking, "userId" | "agentId"> {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  agentId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<BookingDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    agentId: { type: Schema.Types.ObjectId, ref: "Agent", required: true, index: true },
    city: { type: String, required: true },
    date: { type: Date, required: true },
    durationHours: { type: Number, required: true, min: 1 },
    totalAmount: { type: Number, required: true, min: 0 },
    platformCommission: { type: Number, required: true, min: 0 },
    agentPayout: { type: Number, required: true, min: 0 },
    status: { type: String, enum: Object.values(BOOKING_STATUS), default: BOOKING_STATUS.PENDING },
    notes: { type: String }
  },
  { timestamps: true }
);

export const BookingModel = mongoose.model<BookingDocument>("Booking", bookingSchema);
