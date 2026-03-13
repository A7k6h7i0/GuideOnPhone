import mongoose, { Schema, Types } from "mongoose";
import type { IAdminLog } from "../interfaces/AdminLog.js";

export interface AdminLogDocument extends Omit<IAdminLog, "adminId" | "targetId"> {
  _id: Types.ObjectId;
  adminId: Types.ObjectId;
  targetId: Types.ObjectId;
  createdAt: Date;
}

const adminLogSchema = new Schema<AdminLogDocument>(
  {
    adminId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true },
    targetType: { type: String, required: true },
    targetId: { type: Schema.Types.ObjectId, required: true },
    metadata: { type: Schema.Types.Mixed }
  },
  { timestamps: { updatedAt: false } }
);

export const AdminLogModel = mongoose.model<AdminLogDocument>("AdminLog", adminLogSchema);
