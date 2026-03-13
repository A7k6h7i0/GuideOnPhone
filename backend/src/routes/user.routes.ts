import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import { updateUserSchema } from "../validators/user.validators.js";

const router = Router();

router.use(authMiddleware);
router.get("/me", userController.me);
router.patch("/me", validateMiddleware(updateUserSchema), userController.updateMe);

export default router;
