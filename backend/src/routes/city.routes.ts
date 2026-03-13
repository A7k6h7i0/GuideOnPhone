import { Router } from "express";
import { cityController } from "../controllers/city.controller.js";

const router = Router();

router.get("/", cityController.list);

export default router;
