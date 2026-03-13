import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../config/logger.js";

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = StatusCodes.BAD_REQUEST) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const notFoundHandler = (_req: Request, res: Response): void => {
  res.status(StatusCodes.NOT_FOUND).json({ message: "Route not found" });
};

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  const err = error instanceof AppError ? error : new AppError("Internal server error", StatusCodes.INTERNAL_SERVER_ERROR);

  if (!(error instanceof AppError)) {
    logger.error("Unhandled exception", { error: String(error) });
  }

  res.status(err.statusCode).json({ message: err.message });
};
