import { Router } from "express";
import { bookingController } from "../controllers/booking.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { ROLES } from "../constants/roles.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import { createBookingSchema } from "../validators/booking.validators.js";

const router = Router();

router.use(authMiddleware);
router.post("/", roleMiddleware(ROLES.USER), validateMiddleware(createBookingSchema), bookingController.create);
router.get("/me/user", roleMiddleware(ROLES.USER), bookingController.myUserBookings);
router.get("/me/agent", roleMiddleware(ROLES.AGENT), bookingController.myAgentBookings);
router.patch("/:bookingId/complete", roleMiddleware(ROLES.AGENT), bookingController.markCompleted);

export default router;
