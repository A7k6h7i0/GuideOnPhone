import { Router } from "express";
import { adminController } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

router.use(authMiddleware, roleMiddleware(ROLES.ADMIN));
router.get("/agents/pending", adminController.pendingAgents);
router.patch("/agents/:agentId/verify", adminController.verifyAgent);
router.get("/analytics", adminController.analytics);

export default router;
