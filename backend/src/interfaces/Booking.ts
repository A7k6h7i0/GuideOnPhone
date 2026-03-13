import { BookingStatus } from "../constants/bookingStatus.js";

export interface IBooking {
  userId: string;
  agentId: string;
  city: string;
  date: Date;
  durationHours: number;
  totalAmount: number;
  platformCommission: number;
  agentPayout: number;
  status: BookingStatus;
  notes?: string;
}
