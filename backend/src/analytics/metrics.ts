import { BookingModel } from "../models/Booking.model.js";
import { PaymentModel } from "../models/Payment.model.js";

export const metricsService = {
  async summary() {
    const [bookings, paidPayments] = await Promise.all([
      BookingModel.countDocuments(),
      PaymentModel.countDocuments({ status: "PAID" })
    ]);

    return { bookings, paidPayments };
  }
};
