import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { Role } from "../constants/roles.js";

export const roleMiddleware = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(StatusCodes.FORBIDDEN).json({ message: "Forbidden" });
      return;
    }

    next();
  };
};
