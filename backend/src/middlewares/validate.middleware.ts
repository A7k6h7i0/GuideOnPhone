import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject } from "zod";

export const validateMiddleware = (schema: AnyZodObject) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const parsed = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query
    });

    if (!parsed.success) {
      const details = parsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message
      }));

      res.status(422).json({
        message: "Validation failed",
        errors: parsed.error.flatten(),
        details
      });
      return;
    }

    next();
  };
};
