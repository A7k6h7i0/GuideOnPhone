import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import agentRoutes from "./agent.routes.js";
import bookingRoutes from "./booking.routes.js";
import paymentRoutes from "./payment.routes.js";
import reviewRoutes from "./review.routes.js";
import cityRoutes from "./city.routes.js";
import adminRoutes from "./admin.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/agent", agentRoutes);
router.use("/agents", agentRoutes);
router.use("/bookings", bookingRoutes);
router.use("/payments", paymentRoutes);
router.use("/reviews", reviewRoutes);
router.use("/cities", cityRoutes);
router.use("/admin", adminRoutes);

export default router;
