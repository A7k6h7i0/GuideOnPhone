import { Router } from "express";
import { reviewController } from "../controllers/review.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { ROLES } from "../constants/roles.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import { createReviewSchema } from "../validators/review.validators.js";

const router = Router();

router.post("/", authMiddleware, roleMiddleware(ROLES.USER), validateMiddleware(createReviewSchema), reviewController.create);

export default router;
