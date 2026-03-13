import mongoose, { Schema, Types } from "mongoose";
import type { IAgent } from "../interfaces/Agent.js";

export interface AgentDocument extends Omit<IAgent, "userId"> {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const agentSchema = new Schema<AgentDocument>(
  {
    agentId: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    city: { type: String, required: true, index: true },
    state: { type: String, required: true, index: true },
    bio: { type: String },
    languages: [{ type: String, required: true }],
    availableHours: { type: String, required: true },
    guideFee: { type: Number, required: true, min: 0 },
    feePerTrip: { type: Number, required: true, min: 0 },
    cabBooking: { type: Boolean, default: false },
    canBookCab: { type: Boolean, default: false },
    hotelBooking: { type: Boolean, default: false },
    canBookHotel: { type: Boolean, default: false },
    aadhaarMasked: { type: String },
    aadhaarEncrypted: { type: String },
    aadhaarVerified: { type: Boolean, default: false },
    aadhaarOtpHash: { type: String },
    aadhaarOtpExpiresAt: { type: Date },
    aadhaarOtpSessionId: { type: String },
    aadhaarPhotoPath: { type: String },
    selfieImage: { type: String },
    faceVerified: { type: Boolean, default: false },
    faceSimilarityScore: { type: Number },
    gstReferences: [{ type: String, required: true }],
    gstVerified: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["PENDING_VERIFICATION", "APPROVED", "REJECTED"],
      default: "PENDING_VERIFICATION",
      index: true
    },
    rejectionReason: { type: String },
    verificationStatus: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING"
    },
    isActive: { type: Boolean, default: false },
    totalCustomersServed: { type: Number, default: 0 },
    avgRating: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const AgentModel = mongoose.model<AgentDocument>("Agent", agentSchema);
