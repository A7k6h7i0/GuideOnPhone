import { PaymentStatus } from "../constants/paymentStatus.js";

export interface IPayment {
  bookingId: string;
  userId: string;
  agentId: string;
  amount: number;
  commissionAmount: number;
  payoutAmount: number;
  status: PaymentStatus;
  provider: "RAZORPAY";
  orderId?: string;
  transactionId?: string;
}
