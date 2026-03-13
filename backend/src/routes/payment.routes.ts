import { Router } from "express";
import { paymentController } from "../controllers/payment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { ROLES } from "../constants/roles.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import { verifyPaymentSchema } from "../validators/payment.validators.js";

const router = Router();

router.use(authMiddleware);
router.post("/booking/:bookingId/order", roleMiddleware(ROLES.USER), paymentController.createOrder);
router.post("/verify", roleMiddleware(ROLES.USER), validateMiddleware(verifyPaymentSchema), paymentController.verify);
router.get("/me", roleMiddleware(ROLES.USER), paymentController.myPayments);
router.get("/me/agent", roleMiddleware(ROLES.AGENT), paymentController.myAgentPayments);
router.get("/me/agent/summary", roleMiddleware(ROLES.AGENT), paymentController.myAgentSummary);

export default router;
