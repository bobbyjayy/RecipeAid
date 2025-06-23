import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    // check req.body with the ZodSchema and clean data
    const result = schema.safeParse(req.body);

    // if return false then error, map through the
    // different paths(e.g. error at email or error at password)
    if (!result.success) {
      res.status(400).json({
        error: "Validation failed",
        details: result.error?.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      });
      return;
    }

    // Replace body with cleaned data checked by zod
    req.body = result.data;
    next();
  };
}
