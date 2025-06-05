import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { createValidationError } from "../utils/errors";

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.errors
          .map((err) => `${err.path.join(".")}: ${err.message}`)
          .join(", ");
        next(createValidationError(message));
      } else {
        next(error);
      }
    }
  };
