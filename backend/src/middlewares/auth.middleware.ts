import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { verifyAccessToken } from "../utils/jwt.js";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid token" });
  }
};
