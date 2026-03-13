import mongoose, { Schema, Types } from "mongoose";
import type { IReview } from "../interfaces/Review.js";

export interface ReviewDocument extends Omit<IReview, "bookingId" | "userId" | "agentId"> {
  _id: Types.ObjectId;
  bookingId: Types.ObjectId;
  userId: Types.ObjectId;
  agentId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<ReviewDocument>(
  {
    bookingId: { type: Schema.Types.ObjectId, ref: "Booking", required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    agentId: { type: Schema.Types.ObjectId, ref: "Agent", required: true, index: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String }
  },
  { timestamps: true }
);

export const ReviewModel = mongoose.model<ReviewDocument>("Review", reviewSchema);
