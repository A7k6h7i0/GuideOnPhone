import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../validators/auth.validators.js";

const router = Router();

router.post("/register", validateMiddleware(registerSchema), authController.register);
router.post("/login", validateMiddleware(loginSchema), authController.login);

export default router;
