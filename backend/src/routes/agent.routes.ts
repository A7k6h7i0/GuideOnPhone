import { Router } from "express";
import { agentController } from "../controllers/agent.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import { ROLES } from "../constants/roles.js";
import {
  gstVerifySchema,
  registerAgentSchema,
  sendAadhaarOtpSchema,
  upsertAgentProfileSchema,
  uploadSelfieSchema,
  verifyAadhaarOtpSchema
} from "../validators/agent.validators.js";

const router = Router();

router.post("/register", validateMiddleware(registerAgentSchema), agentController.register);

router.get("/", agentController.list);
router.get("/dashboard/me", authMiddleware, roleMiddleware(ROLES.AGENT), agentController.myProfile);
router.put("/dashboard/me", authMiddleware, roleMiddleware(ROLES.AGENT), validateMiddleware(upsertAgentProfileSchema), agentController.upsertMyProfile);
router.post("/aadhaar/send-otp", authMiddleware, roleMiddleware(ROLES.AGENT), validateMiddleware(sendAadhaarOtpSchema), agentController.sendAadhaarOtp);
router.post("/aadhaar/verify-otp", authMiddleware, roleMiddleware(ROLES.AGENT), validateMiddleware(verifyAadhaarOtpSchema), agentController.verifyAadhaarOtp);
router.post("/upload-selfie", authMiddleware, roleMiddleware(ROLES.AGENT), validateMiddleware(uploadSelfieSchema), agentController.uploadSelfie);
router.post("/face-verify", authMiddleware, roleMiddleware(ROLES.AGENT), agentController.faceVerify);
router.post("/gst-verify", authMiddleware, roleMiddleware(ROLES.AGENT), validateMiddleware(gstVerifySchema), agentController.gstVerify);
router.post("/complete-verification", authMiddleware, roleMiddleware(ROLES.AGENT), agentController.completeVerification);
router.get("/:agentId", agentController.getById);

export default router;
