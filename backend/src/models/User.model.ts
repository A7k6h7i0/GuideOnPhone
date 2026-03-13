import mongoose, { Schema, Types } from "mongoose";
import { ROLES } from "../constants/roles.js";
import type { IUser } from "../interfaces/User.js";

export interface UserDocument extends IUser {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(ROLES), default: ROLES.USER },
    avatarUrl: { type: String }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
