export type Role = "USER" | "AGENT" | "ADMIN";

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
}

export interface Agent {
  _id: string;
  agentId: string;
  userId: User;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  bio?: string;
  languages: string[];
  availableHours: string;
  guideFee: number;
  feePerTrip: number;
  cabBooking: boolean;
  canBookCab: boolean;
  hotelBooking: boolean;
  canBookHotel: boolean;
  aadhaarMasked?: string;
  aadhaarVerified: boolean;
  selfieImage?: string;
  faceVerified: boolean;
  faceSimilarityScore?: number;
  gstReferences?: string[];
  gstVerified: boolean;
  status: "PENDING_VERIFICATION" | "APPROVED" | "REJECTED";
  rejectionReason?: string;
  verificationStatus: "PENDING" | "APPROVED" | "REJECTED";
  isActive: boolean;
  avgRating: number;
  totalCustomersServed: number;
}

export interface BookingUserDetails {
  _id: string;
  name: string;
  phone: string;
  email?: string;
}

export interface Booking {
  _id: string;
  userId: string | BookingUserDetails;
  agentId: string | Agent;
  city: string;
  date: string;
  durationHours: number;
  totalAmount: number;
  platformCommission: number;
  agentPayout: number;
  status: "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
}

export interface Payment {
  _id: string;
  bookingId: string;
  amount: number;
  commissionAmount: number;
  payoutAmount: number;
  status: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  orderId?: string;
  transactionId?: string;
  createdAt?: string;
}
